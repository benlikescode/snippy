import { useRef, useEffect, type FC, useState } from 'react'
import AutosizeInput from 'react-input-autosize'

const DEFAULT_TEMPLATE_NAME = 'Untitled Snippy'

const NameInput: FC = () => {
  const [name, setName] = useState(DEFAULT_TEMPLATE_NAME)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSaveName = () => {
    if (!name) {
      setName(DEFAULT_TEMPLATE_NAME)
    }

    setIsEditing(false)

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isEditing && e.key === 'Enter') {
      handleSaveName()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [name, isEditing])

  return (
    <AutosizeInput
      ref={inputRef as any}
      type="text"
      value={name}
      onBlur={() => handleSaveName()}
      onChange={(e) => setName(e.target.value)}
      onClick={() => setIsEditing(true)}
      inputStyle={{
        fontSize: 22,
        borderRadius: '4px',
        fontWeight: 'bold',
        color: '#656972',
        background: 'transparent',
        outline: 'none',
        maxWidth: '100%',
      }}
      className="max-w-[390px] rounded-sm px-1 focus-within:ring-1 focus-within:ring-ring"
    />
  )
}

export default NameInput
