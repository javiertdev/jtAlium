document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-btn');
    const filePathInput = document.getElementById('file-path');
    const hiddenFilesList = document.getElementById('hidden-files');

    // Request initial hidden files
    window.WebviewUtils.postMessageToExtension('getHiddenFiles');

    // Handle unhide all button click
    const unhideAllBtn = document.getElementById('unhide-all-btn');
    unhideAllBtn.addEventListener('click', function() {
        window.WebviewUtils.postMessageToExtension('unhideAllFiles');
        // Refresh the list after unhiding all
        setTimeout(() => window.WebviewUtils.postMessageToExtension('getHiddenFiles'), 100);
    });

    // Handle add button click
    addBtn.addEventListener('click', function() {
        const path = filePathInput.value.trim();
        if (path) {
            window.WebviewUtils.postMessageToExtension('addHiddenFile', { path });
            filePathInput.value = '';
            // Refresh the list after adding
            setTimeout(() => window.WebviewUtils.postMessageToExtension('getHiddenFiles'), 100);
        } else {
            // Show error notification for empty input
            window.WebviewUtils.postMessageToExtension('showError', { message: '[jtAlium] Please enter a file or folder path to hide.' });
        }
    });

    // Handle enter key in input
    filePathInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    // Listen for messages from extension
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'hiddenFiles':
                updateHiddenFilesList(message.files);
                break;
        }
    });

    function updateHiddenFilesList(files) {
        hiddenFilesList.innerHTML = '';
        if (files.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No hidden files or folders here';
            hiddenFilesList.appendChild(emptyMessage);
        } else {
            files.forEach(file => {
                const li = document.createElement('li');
                li.className = 'hidden-file-item';

                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file;

                // Only add click event for files, not folders
                if (!isFolder(file)) {
                    fileName.style.cursor = 'pointer';
                    fileName.addEventListener('click', () => {
                        window.WebviewUtils.postMessageToExtension('openFile', { path: file });
                    });
                }

                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.title = 'Unhide';
                removeBtn.textContent = '×';
                removeBtn.addEventListener('click', () => {
                    window.WebviewUtils.postMessageToExtension('removeHiddenFile', { path: file });
                    // Refresh the list after removing
                    setTimeout(() => window.WebviewUtils.postMessageToExtension('getHiddenFiles'), 100);
                });

                li.appendChild(fileName);
                li.appendChild(removeBtn);
                hiddenFilesList.appendChild(li);
            });
        }
    }

    function isFolder(path) {
        // Simple heuristic: if it doesn't have an extension or ends with common folder patterns
        return !path.includes('.') ||
               path.endsWith('/') ||
               path.endsWith('\\') ||
               path.match(/\.(git|svn|hg)$/);
    }
});