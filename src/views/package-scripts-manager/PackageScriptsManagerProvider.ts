import * as vscode from 'vscode';
import { getPackageScriptsManagerHtmlForWebview } from './html';
import { IWebviewProvider } from '../../core/interfaces/webviewProvider';
import { findPackageJsonFiles, openPackageFile, executeScript, updatePackageScripts, PackageInfo } from '../../core/utils';

export class PackageScriptsManagerProvider implements vscode.WebviewViewProvider, IWebviewProvider {
    public readonly viewType = 'jt-alium.package-scripts-manager';

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

        webviewView.webview.html = getPackageScriptsManagerHtmlForWebview(webviewView.webview, this._extensionUri);

        // Handle messages from the webview
        webviewView.webview.onDidReceiveMessage(
            async (message) => {
                switch (message.type) {
                    case 'getPackages':
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'executeScript':
                        await executeScript(message.packagePath, message.scriptName);
                        break;
                    case 'openPackageFile':
                        await openPackageFile(message.path);
                        break;
                    case 'updateScript':
                        await this.updateScript(message.packagePath, message.scriptName, message.scriptCommand);
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'deleteScript':
                        await this.deleteScript(message.packagePath, message.scriptName);
                        await this.sendPackages(webviewView.webview);
                        break;
                    case 'addScript':
                        await this.addScript(message.packagePath, message.scriptName, message.scriptCommand);
                        await this.sendPackages(webviewView.webview);
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

    private async updateScript(packagePath: string, scriptName: string, scriptCommand: string) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(fullPath));
            const packageJson = JSON.parse(content.toString());

            if (!packageJson.scripts) {
                packageJson.scripts = {};
            }

            packageJson.scripts[scriptName] = scriptCommand;
            await vscode.workspace.fs.writeFile(vscode.Uri.file(fullPath), Buffer.from(JSON.stringify(packageJson, null, 2)));

            vscode.window.showInformationMessage(`[jtAlium] Script "${scriptName}" updated successfully`);
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to update script: ${error}`);
        }
    }

    private async deleteScript(packagePath: string, scriptName: string) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(fullPath));
            const packageJson = JSON.parse(content.toString());

            if (packageJson.scripts && packageJson.scripts[scriptName]) {
                delete packageJson.scripts[scriptName];

                // Remove empty scripts object if no scripts remain
                if (Object.keys(packageJson.scripts).length === 0) {
                    delete packageJson.scripts;
                }

                await vscode.workspace.fs.writeFile(vscode.Uri.file(fullPath), Buffer.from(JSON.stringify(packageJson, null, 2)));

                vscode.window.showInformationMessage(`[jtAlium] Script "${scriptName}" deleted successfully`);
            } else {
                vscode.window.showErrorMessage(`[jtAlium] Script "${scriptName}" not found`);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to delete script: ${error}`);
        }
    }

    private async addScript(packagePath: string, scriptName: string, scriptCommand: string) {
        try {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                return;
            }

            const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(fullPath));
            const packageJson = JSON.parse(content.toString());

            if (!packageJson.scripts) {
                packageJson.scripts = {};
            }

            if (packageJson.scripts[scriptName]) {
                vscode.window.showErrorMessage(`[jtAlium] Script "${scriptName}" already exists`);
                return;
            }

            packageJson.scripts[scriptName] = scriptCommand;
            await vscode.workspace.fs.writeFile(vscode.Uri.file(fullPath), Buffer.from(JSON.stringify(packageJson, null, 2)));

            vscode.window.showInformationMessage(`[jtAlium] Script "${scriptName}" added successfully`);
        } catch (error) {
            vscode.window.showErrorMessage(`[jtAlium] Failed to add script: ${error}`);
        }
    }
}