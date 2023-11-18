'use client'

import { useState, type FC, useEffect } from 'react'
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
  const { openFile, updateItemData } = useFileStore()

  const handleMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
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
    if (!openFile || openFile.type === 'folder') {
      return setValue('')
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
