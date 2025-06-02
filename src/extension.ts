import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('vscode-shell-executor.executeSelectedLine', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);
            if (selectedText) {
                exec(selectedText, (error, stdout, stderr) => {
                    if (error) {
                        vscode.window.showErrorMessage(`Error: ${stderr}`);
                        return;
                    }
                    vscode.window.showInformationMessage(`Output: ${stdout}`);
                });
            } else {
                vscode.window.showWarningMessage('No text selected.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
