document.addEventListener('DOMContentLoaded', function() {
    const packagesContainer = document.getElementById('packages-container');

    // Request initial packages
    window.WebviewUtils.postMessageToExtension('getPackages');

    // Listen for messages from extension
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'packages':
                renderPackages(message.packages);
                break;
        }
    });

    function renderPackages(packages) {
        if (packages.length === 0) {
            packagesContainer.innerHTML = '<div class="empty-message">No package.json files found in the workspace</div>';
            return;
        }

        packagesContainer.innerHTML = packages.map(pkg => `
            <div class="package-card">
                <div class="package-header">
                    <span class="package-path">${pkg.path}</span>
                    <span class="package-name">${pkg.name}</span>
                </div>
                <div class="scripts-section">
                    <div class="scripts-header">
                        <h3>Scripts</h3>
                        <button class="add-script-btn" data-package="${pkg.path}">Add Script</button>
                    </div>
                    <div class="scripts-list" data-package="${pkg.path}">
                        ${renderScripts(pkg.path, pkg.scripts || {})}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        attachEventListeners();
    }

    function renderScripts(packagePath, scripts) {
        const scriptNames = Object.keys(scripts);
        if (scriptNames.length === 0) {
            return '<div class="no-scripts">No scripts defined</div>';
        }

        return scriptNames.map(scriptName => `
            <div class="script-item" data-script="${scriptName}">
                <div class="script-header">
                    <span class="script-name">${scriptName}</span>
                    <div class="script-actions">
                        <button class="run-btn" data-package="${packagePath}" data-script="${scriptName}" title="Run script">▶</button>
                        <button class="edit-btn" data-package="${packagePath}" data-script="${scriptName}" title="Edit script">✎</button>
                        <button class="delete-btn" data-package="${packagePath}" data-script="${scriptName}" title="Delete script">×</button>
                    </div>
                </div>
                <div class="script-command">${scripts[scriptName]}</div>
            </div>
        `).join('');
    }

    function attachEventListeners() {
        // Package path clicks to open file
        document.querySelectorAll('.package-path').forEach(pathElement => {
            pathElement.addEventListener('click', function() {
                const packagePath = this.textContent;
                window.WebviewUtils.postMessageToExtension('openPackageFile', { path: packagePath });
            });
        });

        // Run script buttons
        document.querySelectorAll('.run-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packagePath = this.getAttribute('data-package');
                const scriptName = this.getAttribute('data-script');
                window.WebviewUtils.postMessageToExtension('executeScript', {
                    packagePath,
                    scriptName
                });
            });
        });

        // Edit script buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packagePath = this.getAttribute('data-package');
                const scriptName = this.getAttribute('data-script');
                const scriptItem = this.closest('.script-item');
                const scriptCommand = scriptItem.querySelector('.script-command').textContent;

                editScript(packagePath, scriptName, scriptCommand);
            });
        });

        // Delete script buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packagePath = this.getAttribute('data-package');
                const scriptName = this.getAttribute('data-script');
                // Show custom confirmation modal
                showDeleteConfirmation(packagePath, scriptName);
            });
        });

        // Add script buttons
        document.querySelectorAll('.add-script-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packagePath = this.getAttribute('data-package');
                addScript(packagePath);
            });
        });
    }

    function editScript(packagePath, scriptName, currentCommand) {
        const scriptItem = document.querySelector(`.script-item[data-script="${scriptName}"]`);
        const scriptCommand = scriptItem.querySelector('.script-command');

        const inputHtml = `
            <input type="text" class="script-edit-input" value="${currentCommand}" data-package="${packagePath}" data-script="${scriptName}">
            <button class="save-edit-btn">Save</button>
            <button class="cancel-edit-btn">Cancel</button>
        `;

        scriptCommand.innerHTML = inputHtml;

        const input = scriptCommand.querySelector('.script-edit-input');
        const saveBtn = scriptCommand.querySelector('.save-edit-btn');
        const cancelBtn = scriptCommand.querySelector('.cancel-edit-btn');

        input.focus();
        input.select();

        saveBtn.addEventListener('click', function() {
            const newCommand = input.value.trim();
            if (newCommand) {
                window.WebviewUtils.postMessageToExtension('updateScript', {
                    packagePath,
                    scriptName,
                    scriptCommand: newCommand
                });
            } else {
                scriptCommand.textContent = currentCommand;
            }
        });

        cancelBtn.addEventListener('click', function() {
            scriptCommand.textContent = currentCommand;
        });

        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveBtn.click();
            } else if (e.key === 'Escape') {
                cancelBtn.click();
            }
        });
    }

    function addScript(packagePath) {
        const scriptsList = document.querySelector(`.scripts-list[data-package="${packagePath}"]`);
        const noScripts = scriptsList.querySelector('.no-scripts');

        const addFormHtml = `
            <div class="add-script-form">
                <input type="text" class="script-name-input" placeholder="Script name" maxlength="50">
                <input type="text" class="script-command-input" placeholder="Script command">
                <button class="save-add-btn">Add</button>
                <button class="cancel-add-btn">Cancel</button>
            </div>
        `;

        if (noScripts) {
            noScripts.innerHTML = addFormHtml;
        } else {
            const addForm = document.createElement('div');
            addForm.innerHTML = addFormHtml;
            scriptsList.appendChild(addForm.firstElementChild);
        }

        const nameInput = scriptsList.querySelector('.script-name-input');
        const commandInput = scriptsList.querySelector('.script-command-input');
        const saveBtn = scriptsList.querySelector('.save-add-btn');
        const cancelBtn = scriptsList.querySelector('.cancel-add-btn');

        nameInput.focus();

        saveBtn.addEventListener('click', function() {
            const scriptName = nameInput.value.trim();
            const scriptCommand = commandInput.value.trim();

            if (scriptName && scriptCommand) {
                window.WebviewUtils.postMessageToExtension('addScript', {
                    packagePath,
                    scriptName,
                    scriptCommand
                });
            } else {
                // Remove the form
                const form = scriptsList.querySelector('.add-script-form');
                if (form) {
                    if (noScripts) {
                        noScripts.innerHTML = 'No scripts defined';
                    } else {
                        form.remove();
                    }
                }
            }
        });

        cancelBtn.addEventListener('click', function() {
            const form = scriptsList.querySelector('.add-script-form');
            if (form) {
                if (noScripts) {
                    noScripts.innerHTML = 'No scripts defined';
                } else {
                    form.remove();
                }
            }
        });

        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                commandInput.focus();
            }
        });

        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveBtn.click();
            } else if (e.key === 'Escape') {
                cancelBtn.click();
            }
        });
    }

    function showDeleteConfirmation(packagePath, scriptName) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'delete-modal-overlay';
        modal.innerHTML = `
            <div class="delete-modal">
                <h3>Delete Script</h3>
                <p>Are you sure you want to delete the script "<strong>${scriptName}</strong>"?</p>
                <div class="modal-buttons">
                    <button class="cancel-delete-btn">Cancel</button>
                    <button class="confirm-delete-btn">Delete</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const cancelBtn = modal.querySelector('.cancel-delete-btn');
        const confirmBtn = modal.querySelector('.confirm-delete-btn');

        cancelBtn.addEventListener('click', function() {
            modal.remove();
        });

        confirmBtn.addEventListener('click', function() {
            window.WebviewUtils.postMessageToExtension('deleteScript', {
                packagePath,
                scriptName
            });
            modal.remove();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function closeModal(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeModal);
            }
        });
    }
});