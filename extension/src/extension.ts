import * as vscode from 'vscode'
import { addCodeSnippet, addFileTemplate } from './commands'
import { Snippet } from './types'
import { queryUsersSnippets } from './utils'

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

  const disposable1 = vscode.commands.registerCommand('snippy.addFileTemplate', addFileTemplate)
  const disposable2 = vscode.commands.registerCommand('snippy.addCodeSnippet', addCodeSnippet)

  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
}

export const deactivate = () => {}
