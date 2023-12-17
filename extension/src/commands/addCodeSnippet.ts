import * as vscode from 'vscode'
import { getSnippets } from '../api'
import { Snippet } from '../types'
import { SNIPPY_SITE_URL } from '../constants'

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

export const addCodeSnippet = async () => {
  try {
    const userSnippets = await getSnippets()

    if (!userSnippets.length) {
      const choices = ['Create Snippet', 'Later']

      const selection = await vscode.window.showErrorMessage('This workspace has no snippets.', ...choices)

      if (selection === choices[0]) {
        vscode.env.openExternal(vscode.Uri.parse(SNIPPY_SITE_URL))
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
