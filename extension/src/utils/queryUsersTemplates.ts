const queryUsersTemplates = async () => {
  // TODO - Query users templates from API
  const templates = [] as any[]

  if (!templates) {
    throw new Error('Failed to get your templates')
  }

  const parsedTemplates = templates.map((template) => ({
    ...template,
    files: JSON.parse(template.files),
    prompts: JSON.parse(template.prompts),
  }))

  return parsedTemplates
}

export default queryUsersTemplates
