// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CommandService } from './core/services/commandService';
import { WorkspaceColorProvider } from './views/workspace-color/WorkspaceColorProvider';
import { HideResourcesProvider } from './views/hide-resources/HideResourcesProvider';
import { PackageVersionUpdaterProvider } from './views/package-version-updater/PackageVersionUpdaterProvider';
import { PackageScriptsManagerProvider } from './views/package-scripts-manager/PackageScriptsManagerProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register the open workspace color command
	const openWorkspaceColorDisposable = CommandService.registerOpenWorkspaceColorCommand();

	// Register the open hide resources command
	const openHideResourcesDisposable = CommandService.registerOpenHideResourcesCommand();

	// Register the open package version updater command
	const openPackageVersionUpdaterDisposable = CommandService.registerOpenPackageVersionUpdaterCommand();

	// Register the open package scripts manager command
	const openPackageScriptsManagerDisposable = CommandService.registerOpenPackageScriptsManagerCommand();

	// Register the hide file command
	const hideFileDisposable = CommandService.registerHideFileCommand();

	// Register the workspace color provider
	const workspaceColorProvider = new WorkspaceColorProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(workspaceColorProvider.viewType, workspaceColorProvider)
	);

	// Register the hide resources provider
	const hideResourcesProvider = new HideResourcesProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(hideResourcesProvider.viewType, hideResourcesProvider)
	);

	// Register the package version updater provider
	const packageVersionUpdaterProvider = new PackageVersionUpdaterProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(packageVersionUpdaterProvider.viewType, packageVersionUpdaterProvider)
	);

	// Register the package scripts manager provider
	const packageScriptsManagerProvider = new PackageScriptsManagerProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(packageScriptsManagerProvider.viewType, packageScriptsManagerProvider)
	);

	context.subscriptions.push(openWorkspaceColorDisposable);
	context.subscriptions.push(openHideResourcesDisposable);
	context.subscriptions.push(openPackageVersionUpdaterDisposable);
	context.subscriptions.push(openPackageScriptsManagerDisposable);
	context.subscriptions.push(hideFileDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
