import * as Handlebars from 'handlebars'
import { FileItem, PromptResults, TemplateFolderStructure } from '../types'

const getTemplateFolderStructure = (
  rootPath: string,
  files: FileItem[],
  promptResults: PromptResults
): TemplateFolderStructure[] => {
  // File content & path can have variables that need to be replaced by the prompt results
  const completeTemplate = (template: string) => Handlebars.compile(template)(promptResults)

  return files.map(({ type, data }) => {
    if (type === 'file') {
      const { name, content } = data

      return {
        type,
        path: completeTemplate(`${rootPath}/${name}`),
        content: completeTemplate(content),
      }
    }

    // Item is a folder
    const { name, files } = data

    const pathToFolder = completeTemplate(`${rootPath}/${name}`)
    const folderContent = getTemplateFolderStructure(pathToFolder, files, promptResults)

    return {
      type,
      path: pathToFolder,
      content: folderContent,
    }
  })
}

export default getTemplateFolderStructure
