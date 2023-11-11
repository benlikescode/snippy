import { type FC, useState, type KeyboardEvent } from 'react'
import AutosizeInput from 'react-input-autosize'

const DEFAULT_TEMPLATE_NAME = 'Untitled Snippy'

const NameInput: FC = () => {
  const [name, setName] = useState(DEFAULT_TEMPLATE_NAME)
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveName = (target?: HTMLInputElement) => {
    if (!name) {
      setName(DEFAULT_TEMPLATE_NAME)
    }

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
      value={name}
      onBlur={(e) => handleSaveName(e.target)}
      onChange={(e) => setName(e.target.value)}
      onClick={() => setIsEditing(true)}
      onKeyDown={(e) => handleKeyDown(e)}
      placeholder={DEFAULT_TEMPLATE_NAME}
      inputStyle={{
        fontSize: 22,
        borderRadius: '4px',
        fontWeight: 'bold',
        color: '#656972',
        background: 'transparent',
        outline: 'none',
        maxWidth: '100%',
      }}
      className="max-w-[390px] rounded-sm px-1 focus-within:ring-1 focus-within:ring-input hover:ring-1 hover:ring-input [&>input]:placeholder:text-[#3b3e42]"
    />
  )
}

export default NameInput
