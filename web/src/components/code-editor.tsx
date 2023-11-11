'use client'

import { FC, useState } from 'react'
import { Editor, Monaco, type EditorProps } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

type Props = {} & EditorProps

const CodeEditor: FC<Props> = ({ value, onChange }) => {
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

  const EDITOR_OPTIONS = {
    minimap: { enabled: false },
    padding: { top: 20 },
    dropIntoEditor: { enabled: false },
  }

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      onChange={onChange}
      onMount={handleMount}
      options={EDITOR_OPTIONS}
      value={value}
      loading={<span>loading...</span>}
    />
  )
}

export default CodeEditor
