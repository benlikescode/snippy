import AppLogo from './app-logo'
import VSCodeLogo from './vscode-logo'

const InstallExtension = () => {
  return (
    <div className="hidden rounded-xl bg-[#171717] lg:block">
      <div className="px-6 pb-6">
        <div className="mt-[-24px] flex items-center">
          <AppLogo />
          <VSCodeLogo />
        </div>

        <h2 className="mt-5 text-lg font-semibold tracking-wide">Install Snippy</h2>

        <ol className="mb-8 mt-4 list-inside list-decimal text-sm font-medium text-[#737373]">
          <li>Install Extension</li>
          <li>Log in with GitHub</li>
          <li>Start snipping</li>
        </ol>

        <a
          href="vscode:extension/snippy.snippy"
          className="flex h-14 w-full items-center justify-center rounded-lg border border-[#0957f2] bg-[linear-gradient(180deg,_rgba(9,_88,_242,_0.20)_0%,_rgba(114,_66,_250,_0.20)_100%)]"
        >
          Open in VS Code
        </a>
      </div>
    </div>
  )
}

export default InstallExtension
