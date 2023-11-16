// TODO - Add language specific icons?

export const FILE_LANGUAGES: Record<string, { name: string }> = {
  txt: {
    name: 'Text',
  },
  ts: {
    name: 'Typescript',
  },
  tsx: {
    name: 'TypeScript',
  },
  js: {
    name: 'Javascript',
  },
  jsx: {
    name: 'Javascript',
  },
  py: {
    name: 'Python',
  },
  java: {
    name: 'Java',
  },
  rb: {
    name: 'Ruby',
  },
  c: {
    name: 'C',
  },
  cs: {
    name: 'C#',
  },
  cpp: {
    name: 'C++',
  },
  html: {
    name: 'HTML',
  },
  css: {
    name: 'CSS',
  },
  scss: {
    name: 'SCSS',
  },
  yaml: {
    name: 'YAML',
  },
  go: {
    name: 'Golang',
  },
  json: {
    name: 'JSON',
  },
  rs: {
    name: 'Rust',
  },
  php: {
    name: 'PHP',
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
