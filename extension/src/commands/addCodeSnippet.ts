import * as vscode from 'vscode'
import { Snippet } from '../types'
import { queryUsersSnippets } from '../utils'

const addCodeSnippet = async () => {
  try {
    const userSnippets = await queryUsersSnippets()

    if (!userSnippets.length) {
      const choices = ['Create Snippet', 'Later']

      const selection = await vscode.window.showErrorMessage(`You don't have any snippets yet.`, ...choices)

      if (selection === choices[0]) {
        vscode.env.openExternal(vscode.Uri.parse('https://snippy.app'))
      }

      return
    }

    if (userSnippets.length === 1) {
      return insertSnippet(userSnippets[0])
    }

    // 2+ snippets -> show QuickPick
    const snippetOptions = userSnippets.map((snippet) => ({ ...snippet, label: snippet.name }))

    const selectedSnippet = await vscode.window.showQuickPick(snippetOptions, {
      placeHolder: 'Select your snippet',
    })

    if (!selectedSnippet) {
      return
    }

    insertSnippet(selectedSnippet)
  } catch (error) {
    vscode.window.showErrorMessage((error as Error).message)
  }
}

const insertSnippet = async (snippet: Snippet) => {
  const activeEditor = vscode.window.activeTextEditor

  if (!activeEditor) {
    return
  }

  const cursorPos = activeEditor.selection.active

  activeEditor.edit((editBuilder) => {
    editBuilder.insert(cursorPos, snippet.content)
  })
}

export default addCodeSnippet
