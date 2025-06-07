import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('k.executeSelectedLine', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return }
        const pos = editor.selection.active
        const selection = editor.document.getText(editor.selection);
        let text = selection
        if (!text) {
            text = editor.document.lineAt(pos.line).text
        }
        let term = vscode.window.activeTerminal
        if (!term) {
            term = vscode.window.createTerminal('k')
        }
        term.show()
        term.sendText(text, true)

        // Small delay to ensure terminal processes the input
        await new Promise(resolve => setTimeout(resolve, 100));

        // Focus back to editor
        await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');

        // Move cursor to the next line
        const nextLine = Math.min(pos.line + 1, editor.document.lineCount - 1);
        const newPosition = new vscode.Position(nextLine, 0);
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.revealRange(new vscode.Range(newPosition, newPosition));
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
