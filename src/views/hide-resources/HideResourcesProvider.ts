import * as vscode from 'vscode';
import { getHideResourcesHtmlForWebview } from './html';
import { IWebviewProvider } from '../../core/interfaces/webviewProvider';

export class HideResourcesProvider implements vscode.WebviewViewProvider, IWebviewProvider {
    public readonly viewType = 'jt-alium.hide-resources';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = getHideResourcesHtmlForWebview(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'addHiddenFile':
                        await this.addHiddenFile(message.path);
                        break;
                    case 'removeHiddenFile':
                        await this.removeHiddenFile(message.path);
                        break;
                    case 'openFile':
                        await this.openFile(message.path);
                        break;
                    case 'getHiddenFiles':
                        await this.sendHiddenFiles(webviewView.webview);
                        break;
                    case 'showError':
                        vscode.window.showErrorMessage(message.message);
                        break;
                    case 'unhideAllFiles':
                        await this.unhideAllFiles();
                        break;
                }
            },
            undefined,
            []
        );
    }

    private async addHiddenFile(path: string) {
        const config = vscode.workspace.getConfiguration();
        const inspect = config.inspect('files.exclude');
        const workspaceExcludes = inspect?.workspaceValue as { [key: string]: boolean } || {};
        const updatedExcludes = { ...workspaceExcludes, [path]: true };
        await config.update('files.exclude', updatedExcludes, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`[jtAlium] Hidden: ${path}`);
    }

    private async removeHiddenFile(path: string) {
        const config = vscode.workspace.getConfiguration();
        const inspect = config.inspect('files.exclude');
        const workspaceExcludes = inspect?.workspaceValue as { [key: string]: boolean } || {};
        const updatedExcludes = { ...workspaceExcludes };
        delete updatedExcludes[path];
        await config.update('files.exclude', updatedExcludes, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`[jtAlium] Unhidden: ${path}`);
    }

    private async openFile(path: string) {
        // Convert relative path to absolute path if needed
        let fullPath = path;
        if (!path.startsWith('/')) {
            // It's a relative path, make it absolute
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (workspaceFolder) {
                fullPath = vscode.Uri.joinPath(workspaceFolder.uri, path).fsPath;
            }
        }

        const uri = vscode.Uri.file(fullPath);
        try {
            const document = await vscode.workspace.openTextDocument(uri);
            await vscode.window.showTextDocument(document);
        } catch (error) {
            // Nothing
        }
    }

    private async sendHiddenFiles(webview: vscode.Webview) {
        const config = vscode.workspace.getConfiguration();
        const inspect = config.inspect('files.exclude');
        const workspaceExcludes = inspect?.workspaceValue as { [key: string]: boolean } || {};
        const hiddenFiles = Object.keys(workspaceExcludes).filter(key => workspaceExcludes[key] === true);
        webview.postMessage({ type: 'hiddenFiles', files: hiddenFiles });
    }

    private async unhideAllFiles() {
        const config = vscode.workspace.getConfiguration();
        const inspect = config.inspect('files.exclude');
        const workspaceExcludes = inspect?.workspaceValue as { [key: string]: boolean } || {};

        // Check if there are any hidden files
        const hiddenFiles = Object.keys(workspaceExcludes).filter(key => workspaceExcludes[key] === true);
        if (hiddenFiles.length === 0) {
            vscode.window.showInformationMessage('[jtAlium] No hidden files to unhide');
            return;
        }

        // Clear all workspace excludes
        await config.update('files.exclude', {}, vscode.ConfigurationTarget.Workspace);
        vscode.window.showInformationMessage(`[jtAlium] Unhidden all ${hiddenFiles.length} files/folders`);
    }
}