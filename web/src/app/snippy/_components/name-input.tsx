import useSnippyStore from '@/stores/useSnippyStore'
import { cn } from '@/utils/cn'
import { type FC, useState, type KeyboardEvent, type InputHTMLAttributes } from 'react'
import AutosizeInput from 'react-input-autosize'

const DEFAULT_TEMPLATE_NAME = 'Untitled Snippy'

type Props = InputHTMLAttributes<HTMLInputElement>

const NameInput: FC<Props> = ({ className, ...props }) => {
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
      onFocus={() => setIsEditing(true)}
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
      className={cn(
        'max-w-[390px] rounded-sm px-1 focus-within:ring-1 focus-within:ring-border hover:ring-1 hover:ring-border [&>input]:placeholder:text-[#464646]',
        className,
      )}
      {...props}
    />
  )
}

export default NameInput
