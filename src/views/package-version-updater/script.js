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
                    <span class="current-version">v<strong>${pkg.version}</strong></span>
                </div>
                <div class="version-controls">
                    <h3 class="package-name">${pkg.name}</h3>
                    <div class="version-group">
                        <div class="version-input-group">
                            <button class="version-btn increment" data-package="${pkg.path}" data-type="major" data-current="${getVersionPart(pkg.version, 0)}">+</button>
                            <span class="version-display" data-package="${pkg.path}" data-type="major">${getVersionPart(pkg.version, 0)}</span>
                            <button class="version-btn decrement" data-package="${pkg.path}" data-type="major" data-current="${getVersionPart(pkg.version, 0)}">-</button>
                        </div>
                        <span class="dot">.</span>
                        <div class="version-input-group">
                            <button class="version-btn increment" data-package="${pkg.path}" data-type="minor" data-current="${getVersionPart(pkg.version, 1)}">+</button>
                            <span class="version-display" data-package="${pkg.path}" data-type="minor">${getVersionPart(pkg.version, 1)}</span>
                            <button class="version-btn decrement" data-package="${pkg.path}" data-type="minor" data-current="${getVersionPart(pkg.version, 1)}">-</button>
                        </div>
                        <span class="dot">.</span>
                        <div class="version-input-group">
                            <button class="version-btn increment" data-package="${pkg.path}" data-type="patch" data-current="${getVersionPart(pkg.version, 2)}">+</button>
                            <span class="version-display" data-package="${pkg.path}" data-type="patch">${getVersionPart(pkg.version, 2)}</span>
                            <button class="version-btn decrement" data-package="${pkg.path}" data-type="patch" data-current="${getVersionPart(pkg.version, 2)}">-</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners for buttons and inputs
        attachEventListeners();
    }

    function attachEventListeners() {
        // Handle package path clicks to open file
        document.querySelectorAll('.package-path').forEach(pathElement => {
            pathElement.addEventListener('click', function() {
                const packagePath = this.textContent;
                window.WebviewUtils.postMessageToExtension('openPackageFile', { path: packagePath });
            });
        });

        // Handle increment/decrement buttons
        document.querySelectorAll('.version-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packagePath = this.getAttribute('data-package');
                const type = this.getAttribute('data-type');
                const currentValue = parseInt(this.getAttribute('data-current'), 10);
                const isIncrement = this.classList.contains('increment');
                const newValue = isIncrement ? currentValue + 1 : Math.max(0, currentValue - 1);

                // Update the display value
                const display = this.parentElement.querySelector('.version-display');
                display.textContent = newValue;

                // Update button data-current
                this.parentElement.querySelectorAll('.version-btn').forEach(b => {
                    if (b.getAttribute('data-type') === type) {
                        b.setAttribute('data-current', newValue);
                    }
                });

                // Send update to extension
                window.WebviewUtils.postMessageToExtension('updateVersion', {
                    packagePath,
                    versionType: type,
                    newVersion: newValue
                });
            });
        });
    }

    function getVersionPart(version, index) {
        const parts = version.split('.');
        return parseInt(parts[index] || 0, 10);
    }
});