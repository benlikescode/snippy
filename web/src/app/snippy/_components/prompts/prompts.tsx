import useSnippyStore from '@/stores/useSnippyStore'
import NewPrompt from './new-prompt'
import PromptItem from './prompt-item'

const Prompts = () => {
  const { prompts } = useSnippyStore()

  return (
    <div className="max-h-[350px] overflow-y-auto p-5">
      {!!prompts.length && (
        <div className="mb-4 space-y-3">
          {prompts.map((prompt) => (
            <PromptItem key={prompt.variable} prompt={prompt} />
          ))}
        </div>
      )}

      <NewPrompt />
    </div>
  )
}

export default Prompts
