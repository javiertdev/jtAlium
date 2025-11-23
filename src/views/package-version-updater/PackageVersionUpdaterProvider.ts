import * as vscode from 'vscode';
import * as fs from 'fs';
import { getPackageVersionUpdaterHtmlForWebview } from './html';
import { IWebviewProvider } from '../../core/interfaces/webviewProvider';
import { findPackageJsonFiles, openPackageFile, PackageInfo } from '../../core/utils';

export class PackageVersionUpdaterProvider implements vscode.WebviewViewProvider, IWebviewProvider {
    public readonly viewType = 'jt-alium.package-version-updater';

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

        webviewView.webview.html = getPackageVersionUpdaterHtmlForWebview(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'getPackages':
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'updateVersion':
                        await this.updateVersion(message.packagePath, message.versionType, message.newVersion);
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'openPackageFile':
                        await openPackageFile(message.path);
                        break;
                }
            },
            undefined,
            []
        );
    }

    private async sendPackages(webview: vscode.Webview) {
        const packages = await findPackageJsonFiles();
        webview.postMessage({ type: 'packages', packages });
    }

    private async updateVersion(packagePath: string, versionType: 'major' | 'minor' | 'patch', newVersion: number) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
            const content = await fs.promises.readFile(fullPath, 'utf-8');
            const packageJson = JSON.parse(content);

            const currentVersion = packageJson.version || '0.0.0';
            const versionParts = currentVersion.split('.').map((v: string) => parseInt(v, 10));

            if (versionType === 'major') {
                versionParts[0] = newVersion;
                versionParts[1] = 0;
                versionParts[2] = 0;
            } else if (versionType === 'minor') {
                versionParts[1] = newVersion;
                versionParts[2] = 0;
            } else if (versionType === 'patch') {
                versionParts[2] = newVersion;
            }

            packageJson.version = versionParts.join('.');
            await fs.promises.writeFile(fullPath, JSON.stringify(packageJson, null, 2));

            vscode.window.showInformationMessage(`[jtAlium] Updated ${packageJson.name} to version ${packageJson.version}`);
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to update package version: ${error}`);
        }
    }

}