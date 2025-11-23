import * as vscode from 'vscode';

export interface IWebviewProvider {
    readonly viewType: string;
    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ): void | Thenable<void>;
}