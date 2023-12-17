import * as vscode from 'vscode'
import getTemplates from '../api/getTemplates'
import { PromptResults, Template } from '../types'
import { buildFolderStructure, getTemplateFolderStructure } from '../utils'
import { SNIPPY_SITE_URL } from '../constants'

const addFileTemplate = async (path: vscode.Uri, context: vscode.ExtensionContext) => {
  try {
    const rootPath = path.fsPath
    const userTemplates = await getTemplates(context)

    if (!userTemplates.length) {
      const choices = ['Create Template', 'Later']

      const selection = await vscode.window.showErrorMessage('This workspace has no templates.', ...choices)

      if (selection === choices[0]) {
        vscode.env.openExternal(vscode.Uri.parse(SNIPPY_SITE_URL))
      }

      return
    }

    if (userTemplates.length === 1) {
      return applyTemplate(userTemplates[0], rootPath)
    }

    // 2+ templates -> show QuickPick
    const templateOptions = userTemplates.map((template) => ({ ...template, label: template.name }))

    const selectedTemplate = await vscode.window.showQuickPick(templateOptions, {
      placeHolder: 'Select your template',
    })

    if (!selectedTemplate) {
      return
    }

    applyTemplate(selectedTemplate, rootPath)
  } catch (error) {
    vscode.window.showErrorMessage((error as Error).message)
  }
}

const applyTemplate = async (template: Template, rootPath: string) => {
  const { prompts, files } = template

  const promptResults = {} as PromptResults

  if (prompts && prompts.length) {
    for (const p of prompts) {
      const { prompt, variable } = p

      const promptResult = await vscode.window.showInputBox({ prompt })

      if (!promptResult) {
        return
      }

      promptResults[variable] = promptResult
    }
  }

  const structure = getTemplateFolderStructure(rootPath, files, promptResults)

  buildFolderStructure(structure)
}

export default addFileTemplate
