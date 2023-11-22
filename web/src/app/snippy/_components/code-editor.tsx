'use client'

import { useState, type FC, useEffect, useRef } from 'react'
import { Editor, type Monaco, type EditorProps } from '@monaco-editor/react'
import type * as monaco from 'monaco-editor'
import useFileStore from '@/stores/useFileStore'

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  padding: { top: 20 },
  dropIntoEditor: { enabled: false },
}

const CodeEditor: FC<EditorProps> = () => {
  const [value, setValue] = useState('')
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { openFile, updateItemData } = useFileStore()

  const handleMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    const themeData: monaco.editor.IStandaloneThemeData = {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#070707',
      },
    }

    monaco.editor.defineTheme('snippy', themeData)
    monaco.editor.setTheme('snippy')
  }

  const onChange = (value: string | undefined) => {
    if (!value || !openFile?.id) return

    setValue(value)
    updateItemData(openFile.id, { content: value })
  }

  useEffect(() => {
    if (!openFile || openFile.type === 'folder' || !editorRef.current || !monacoRef.current) {
      return setValue('')
    }

    const model = editorRef.current.getModel()
    const newLanuage = openFile.data.language

    if (model && newLanuage) {
      monacoRef.current.editor.setModelLanguage(model, newLanuage)
    }

    setValue(openFile.data.content)
  }, [openFile])

  return (
    <Editor
      height="100%"
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
