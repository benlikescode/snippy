'use client'

import { useState, type FC, useEffect } from 'react'
import { Editor, type Monaco, type EditorProps } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import useFileStore from '@/stores/useFileStore'

const EDITOR_OPTIONS: monaco.editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  padding: { top: 12 },
  dropIntoEditor: { enabled: false },
  fontSize: 16,
  tabSize: 2,
}

const CodeEditor: FC<EditorProps> = () => {
  const [value, setValue] = useState('')
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco>()
  const [editorInstance, setEditorInstance] = useState<monaco.editor.IStandaloneCodeEditor>()

  const { openFile, updateItemData } = useFileStore()

  const handleMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    setMonacoInstance(monaco)
    setEditorInstance(editor)

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    })

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    })

    const themeData: monaco.editor.IStandaloneThemeData = {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#0c0c0c',
      },
    }

    monaco.editor.defineTheme('snippy', themeData)
    monaco.editor.setTheme('snippy')
  }

  const onChange = (value: string | undefined) => {
    if (value === undefined || !openFile?.id) return

    setValue(value)
    updateItemData(openFile.id, { content: value })
  }

  useEffect(() => {
    if (!openFile || openFile.type === 'folder' || !monacoInstance || !editorInstance) {
      return setValue('')
    }

    const model = editorInstance.getModel()
    const newLanuage = openFile.data.language

    if (model && newLanuage) {
      monacoInstance.editor.setModelLanguage(model, newLanuage)
    }

    setValue(openFile.data.content)
  }, [openFile, monacoInstance, editorInstance])

  return (
    <Editor
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={onChange}
      onMount={handleMount}
      options={EDITOR_OPTIONS}
      value={value}
    />
  )
}

export default CodeEditor
