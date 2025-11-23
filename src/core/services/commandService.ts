 import * as vscode from 'vscode';

export class CommandService {
    public static registerOpenWorkspaceColorCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.openWorkspaceColor', () => {
            vscode.commands.executeCommand('workbench.view.extension.jt-alium-container', 'jt-alium.workspace-color');
        });
    }

    public static registerOpenHideResourcesCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.openHideResources', () => {
            vscode.commands.executeCommand('workbench.view.extension.jt-alium-container', 'jt-alium.hide-resources');
        });
    }

    public static registerOpenPackageVersionUpdaterCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.openPackageVersionUpdater', () => {
            vscode.commands.executeCommand('workbench.view.extension.jt-alium-container', 'jt-alium.package-version-updater');
        });
    }

    public static registerOpenPackageScriptsManagerCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.openPackageScriptsManager', () => {
            vscode.commands.executeCommand('workbench.view.extension.jt-alium-container', 'jt-alium.package-scripts-manager');
        });
    }


    public static registerHideFileCommand(): vscode.Disposable {
        return vscode.commands.registerCommand('jt-alium.hideFile', (uri: vscode.Uri) => {
            if (uri) {
                const relativePath = vscode.workspace.asRelativePath(uri);
                const config = vscode.workspace.getConfiguration();
                const inspect = config.inspect('files.exclude');
                const workspaceExcludes = inspect?.workspaceValue as { [key: string]: boolean } || {};
                const updatedExcludes = { ...workspaceExcludes, [relativePath]: true };
                config.update('files.exclude', updatedExcludes, vscode.ConfigurationTarget.Workspace);
                vscode.window.showInformationMessage(`[jtAlium] Hidden: ${relativePath}`);
            }
        });
    }
}