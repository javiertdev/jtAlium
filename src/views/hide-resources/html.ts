import * as vscode from 'vscode';

export function getHideResourcesHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'views', 'hide-resources', 'styles.css'));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'views', 'hide-resources', 'script.js'));
    const nonce = getNonce();

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}' ${webview.cspSource};">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${styleUri}" rel="stylesheet">
            <title>Hide Resources</title>
        </head>
        <body>
            <div class="add-section">
                <input type="text" id="file-path" placeholder="Enter file/folder path (e.g., node_modules)">
                <button id="add-btn" class="codicon codicon-add">Add</button>
            </div>
            <div class="hidden-files-list">
                <div class="hidden-files-header">
                    <h3>Hidden Files/Folders</h3>
                    <button id="unhide-all-btn" class="unhide-all-btn codicon codicon-eye-closed" title="Unhide all files/folders">Unhide All</button>
                </div>
                <ul id="hidden-files"></ul>
            </div>
            <script nonce="${nonce}">
                // WebviewUtils injection for communication with extension
                const vscode = acquireVsCodeApi();
                window.WebviewUtils = {
                    postMessageToExtension: function(type, data) {
                        const message = { type: type, ...data };
                        vscode.postMessage(message);
                    }
                };
            </script>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}