import * as vscode from 'vscode'
import getWorkspaces from './api/getWorkspaces'
import { addCodeSnippet, addFileTemplate } from './commands'
import { Snippet, Workspace } from './types'

function escapeHtmlAttribute(value: string) {
  return value.replace(/"/g, '&quot;')
}

function getWebviewContent(snippets: Snippet[]) {
  // Generate an HTML document with the snippet list
  const snippetItems = snippets.map((snippet) => {
    const escapedContent = escapeHtmlAttribute(snippet.content)

    return `
      <div
        draggable="true"
        ondragstart="drag(event)"
        onclick="insertSnippetContent('${escapedContent}')"
        data-snippet-name="${escapedContent}"
        class="snippet-item"
      >
        ${snippet.name}
      </div>
    `
  })

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Code Snippets</title>
        <style>
          .snippet-item {
            border: 1px solid #888;
            border-radius: 4px;
            padding: 8px;
            margin: 8px 0;
            cursor: grab;
          }
        </style>
      </head>
      <body>
        <div id="snippet-list">
          ${snippetItems.join('')}
        </div>
        <script>
          const vscode = acquireVsCodeApi();

          function drag(event) {
            event.dataTransfer.setData("text/plain", event.target.getAttribute("data-snippet-name"));
          }

          function insertSnippetContent(content) {
            vscode.postMessage({
              command: 'insertSnippetContent',
              content: content,
            });
          }
        </script>
      </body>
    </html>
  `
}

function insertSnippetInActiveEditor(content: string) {
  const editor = vscode.window.activeTextEditor
  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, content)
    })
  }
}

let statusBarItem: vscode.StatusBarItem | undefined

export const activate = (context: vscode.ExtensionContext) => {
  console.log('Snippy extension is activated!')

  vscode.window.registerWebviewViewProvider('snippy.snippyView', {
    resolveWebviewView(webviewView) {
      webviewView.webview.options = {
        enableScripts: true,
      }

      try {
        const snippets = [
          {
            id: 'dc93f472-5d6f-441c-8ebd-26439dbab980',
            name: 'Fetch from API',
            content: 'const res = await fetch("http://localhost:3000/api/users")',
            creatorId: '7f057af6-9717-4e8b-91d9-c49054f2a76f',
            workspaceId: '2abfbf54-a1e4-48aa-ad3f-32abec80a544',
          },
          {
            id: '979b2faf-3075-4435-a294-602ee22e540e',
            name: 'Console Log',
            content: 'console.log("Hello World")',
            creatorId: '59d82598-2c91-4f41-a631-170a55f65972',
            workspaceId: '1e8e7058-df21-40f5-ba46-4d86328528a0',
          },
        ]

        webviewView.webview.html = getWebviewContent(snippets)

        webviewView.webview.onDidReceiveMessage((message) => {
          if (message.command === 'insertSnippetContent') {
            insertSnippetInActiveEditor(message.content)
          }
        })
      } catch (error) {
        console.error('Error loading snippets:', error)
      }
    },
  })

  // Create a new status bar item that will be shown to the far right
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  statusBarItem.command = 'snippy.selectWorkspace'
  statusBarItem.text = '$(organization) Select Workspace'
  statusBarItem.tooltip = 'Select a snippy workspace'
  statusBarItem.show()

  // Fires on status bar click
  let disposable = vscode.commands.registerCommand('snippy.selectWorkspace', async function () {
    const workspaces = await getWorkspaces()

    const workspaceOptions = workspaces.map((workspace) => ({ ...workspace, label: workspace.name }))

    const selectedWorkspace = await vscode.window.showQuickPick(workspaceOptions, {
      placeHolder: 'Select your workspace',
    })

    if (!selectedWorkspace) {
      return
    }

    context.globalState.update('currWorkspace', selectedWorkspace)

    updateStatusBar(selectedWorkspace)
  })

  context.subscriptions.push(statusBarItem)
  context.subscriptions.push(disposable)

  const currWorkspace = context.globalState.get('currWorkspace') as Workspace
  updateStatusBar(currWorkspace)

  const disposable1 = vscode.commands.registerCommand('snippy.addFileTemplate', (path) =>
    addFileTemplate(path, context)
  )
  const disposable2 = vscode.commands.registerCommand('snippy.addCodeSnippet', addCodeSnippet)

  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
}

const updateStatusBar = (newWorkspace: Workspace) => {
  if (!statusBarItem || !newWorkspace) return

  // Set the text to the name of the workspace
  statusBarItem.text = `$(organization) ${newWorkspace.name}`
  statusBarItem.tooltip = `Change snippy workspace`
}

export const deactivate = () => {
  if (statusBarItem) {
    statusBarItem.dispose()
  }
}
