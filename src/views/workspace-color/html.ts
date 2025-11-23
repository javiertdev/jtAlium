import * as vscode from 'vscode';
import { themes } from '../../core/themes';

export function getWorkspaceColorHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri): string {
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'views', 'workspace-color', 'styles.css'));
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src', 'views', 'workspace-color', 'script.js'));
    const nonce = getNonce();

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}' ${webview.cspSource};">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${styleUri}" rel="stylesheet">
            <title>Workspace Color</title>
        </head>
        <body>
            <div class="grid">
                ${generateThemeGrid()}
            </div>
            <div class="custom-color">
                <div class="input-colors">
                    <div class="input-group">
                        <label for="bg-color">Background:</label>
                        <input type="color" id="bg-color" value="#ffffff">
                    </div>
                    <div class="input-group">
                        <label for="text-color">Text:</label>
                        <input type="color" id="text-color" value="#000000">
                    </div>
                </div>
                <button id="apply-custom-theme" class="codicon codicon-check">Apply custom colors</button>
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

/**
 * Genera el grid de temas con el botón de remover
 */
function generateThemeGrid(): string {
    const removeSquare = `
        <div class="theme-square remove-theme" data-action="remove">
            <span>×</span>
        </div>
    `;
    const themeSquares = themes.map((theme) => `
        <div class="theme-square" title="${theme.label}" data-theme='${JSON.stringify(theme)}'>
            JT
        </div>
    `).join('');

    return removeSquare + themeSquares;
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}