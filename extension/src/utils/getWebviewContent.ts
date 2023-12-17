import { Snippet } from '../types'

const escapeHtmlAttribute = (value: string) => {
  return value.replace(/"/g, '&quot;')
}

export const getWebviewContent = (snippets: Snippet[]) => {
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
