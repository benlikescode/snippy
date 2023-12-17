import * as vscode from 'vscode'

export const addSnippetToEditor = (content: string) => {
  const editor = vscode.window.activeTextEditor

  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, content)
    })
  }
}
