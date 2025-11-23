import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface PackageInfo {
    name: string;
    version: string;
    path: string;
    scripts?: { [key: string]: string };
}

export async function findPackageJsonFiles(): Promise<PackageInfo[]> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        return [];
    }

    const packages: PackageInfo[] = [];
    const ignoredDirs = ['node_modules', 'vendor', '.git', '.svn', '.hg', 'dist', 'build'];

    for (const folder of workspaceFolders) {
        await scanDirectory(folder.uri.fsPath, packages, ignoredDirs);
    }

    // Sort packages: root package.json first, then others alphabetically
    return packages.sort((a, b) => {
        const aIsRoot = a.path === 'package.json';
        const bIsRoot = b.path === 'package.json';

        if (aIsRoot && !bIsRoot) {return -1;}
        if (!aIsRoot && bIsRoot) {return 1;}

        return a.path.localeCompare(b.path);
    });
}

export async function scanDirectory(dirPath: string, packages: PackageInfo[], ignoredDirs: string[]): Promise<void> {
    try {
        const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);

            if (entry.isDirectory()) {
                if (!ignoredDirs.includes(entry.name)) {
                    await scanDirectory(fullPath, packages, ignoredDirs);
                }
            } else if (entry.isFile() && entry.name === 'package.json') {
                try {
                    const content = await fs.promises.readFile(fullPath, 'utf-8');
                    const packageJson = JSON.parse(content);
                    const relativePath = vscode.workspace.asRelativePath(fullPath);

                    packages.push({
                        name: packageJson.name || 'Unknown',
                        version: packageJson.version || '0.0.0',
                        path: relativePath,
                        scripts: packageJson.scripts || {}
                    });
                } catch (error) {
                    // Skip invalid package.json files
                }
            }
        }
    } catch (error) {
        // Skip directories that can't be read
    }
}

export async function openPackageFile(packagePath: string) {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return;
        }

        const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath);
        const document = await vscode.workspace.openTextDocument(fullPath);
        await vscode.window.showTextDocument(document);
    } catch (error) {
        vscode.window.showErrorMessage(`[jtAlium] Failed to open package.json file: ${error}`);
    }
}

export async function executeScript(packagePath: string, scriptName: string) {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return;
        }

        const packageDir = path.dirname(vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath);
        const terminal = vscode.window.createTerminal(`Package Scripts: ${scriptName}`);
        terminal.show();
        terminal.sendText(`cd "${packageDir}" && npm run ${scriptName}`);
    } catch (error) {
        vscode.window.showErrorMessage(`[jtAlium] Failed to execute script: ${error}`);
    }
}

export async function updatePackageScripts(packagePath: string, scripts: { [key: string]: string }) {
    try {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            return;
        }

        const fullPath = vscode.Uri.joinPath(workspaceFolder.uri, packagePath).fsPath;
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        const packageJson = JSON.parse(content);

        packageJson.scripts = scripts;
        await fs.promises.writeFile(fullPath, JSON.stringify(packageJson, null, 2));

        vscode.window.showInformationMessage(`[jtAlium] Scripts updated successfully`);
    } catch (error) {
        vscode.window.showErrorMessage(`[jtAlium] Failed to update scripts: ${error}`);
    }
}