// TODO - Add language specific icons?

export const FILE_LANGUAGES: Record<string, { name: string }> = {
  txt: {
    name: 'txt',
  },
  ts: {
    name: 'typescript',
  },
  tsx: {
    name: 'typescript',
  },
  js: {
    name: 'javascript',
  },
  jsx: {
    name: 'javascript',
  },
  py: {
    name: 'python',
  },
  java: {
    name: 'java',
  },
  rb: {
    name: 'ruby',
  },
  c: {
    name: 'c',
  },
  cs: {
    name: 'cs',
  },
  cpp: {
    name: 'cpp',
  },
  html: {
    name: 'html',
  },
  css: {
    name: 'css',
  },
  scss: {
    name: 'scss',
  },
  yaml: {
    name: 'yaml',
  },
  go: {
    name: 'go',
  },
  json: {
    name: 'json',
  },
  rs: {
    name: 'rs',
  },
  php: {
    name: 'php',
  },
}

export const DEFAULT_FILE_LANGUAGE = FILE_LANGUAGES.txt

const getFileLanguage = (fileName: string) => {
  const extension = fileName.split('.').pop()

  if (!extension) {
    return DEFAULT_FILE_LANGUAGE?.name
  }

  const language = FILE_LANGUAGES[extension]

  if (!language) {
    return DEFAULT_FILE_LANGUAGE?.name
  }

  return language.name
}

export default getFileLanguage
