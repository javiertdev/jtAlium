import * as vscode from 'vscode';
import { getWorkspaceColorHtmlForWebview } from './html';
import { IWebviewProvider } from '../../core/interfaces/webviewProvider';

export class WorkspaceColorProvider implements vscode.WebviewViewProvider, IWebviewProvider {
    public readonly viewType = 'jt-alium.workspace-color';

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

        webviewView.webview.html = getWorkspaceColorHtmlForWebview(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'applyTheme':
                        await this.applyTheme(message.theme);
                        break;
                    case 'removeTheme':
                        await this.removeTheme();
                        break;
                    case 'applyCustomTheme':
                        await this.applyCustomTheme(message.bg, message.text);
                        break;
                }
            },
            undefined,
            []
        );
    }

    private async applyTheme(theme: any) {
        const config = vscode.workspace.getConfiguration();
        const colorCustomizations = {
            "titleBar.activeBackground": theme.bg,
            "titleBar.activeForeground": theme.text,
            "titleBar.inactiveBackground": theme.bg + "aa", // 66% opacity
            "titleBar.inactiveForeground": theme.text + "aa"
        };

        await config.update('workbench.colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Workspace);
    }

    private async removeTheme() {
        const config = vscode.workspace.getConfiguration();
        await config.update('workbench.colorCustomizations', undefined, vscode.ConfigurationTarget.Workspace);
    }

    private async applyCustomTheme(bg: string, text: string) {
        const config = vscode.workspace.getConfiguration();
        const colorCustomizations = {
            "titleBar.activeBackground": bg,
            "titleBar.activeForeground": text,
            "titleBar.inactiveBackground": bg + "aa", // 66% opacity
            "titleBar.inactiveForeground": text + "aa"
        };

        await config.update('workbench.colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Workspace);
    }
}