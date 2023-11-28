import useSnippyStore from '@/stores/useSnippyStore'
import { type FC, useState, type KeyboardEvent } from 'react'
import AutosizeInput from 'react-input-autosize'

const DEFAULT_TEMPLATE_NAME = 'Untitled Snippy'

const NameInput: FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { snippyName, setSnippyName } = useSnippyStore()

  const handleSaveName = (target?: HTMLInputElement) => {
    setIsEditing(false)
    target?.blur()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isEditing && e.key === 'Enter') {
      handleSaveName(e.target as HTMLInputElement)
    }
  }

  return (
    <AutosizeInput
      type="text"
      value={snippyName}
      onBlur={(e) => handleSaveName(e.target)}
      onChange={(e) => setSnippyName(e.target.value)}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => handleKeyDown(e)}
      placeholder={DEFAULT_TEMPLATE_NAME}
      inputStyle={{
        fontSize: 18,
        borderRadius: '4px',
        fontWeight: 600,
        color: '#fff',
        background: 'transparent',
        outline: 'none',
        maxWidth: '100%',
      }}
      className="max-w-[390px] rounded-sm px-1 focus-within:ring-1 focus-within:ring-border hover:ring-1 hover:ring-border [&>input]:placeholder:text-[#464646]"
    />
  )
}

export default NameInput
