const queryUsersSnippets = async () => {
  // TODO - Query users snippets from API
  const snippets = [
    {
      id: 'dc93f472-5d6f-441c-8ebd-26439dbab980',
      name: 'Fetch from API',
      content: 'const res = await fetch("http://localhost:3000/api/users")',
      creatorId: '7f057af6-9717-4e8b-91d9-c49054f2a76f',
      workspaceId: '2abfbf54-a1e4-48aa-ad3f-32abec80a544',
    },
    {
      id: '979b2faf-3075-4435-a294-602ee22e540e',
      name: 'Console Log',
      content: 'console.log("Hello World")',
      creatorId: '59d82598-2c91-4f41-a631-170a55f65972',
      workspaceId: '1e8e7058-df21-40f5-ba46-4d86328528a0',
    },
  ]

  if (!snippets) {
    throw new Error('Failed to get your snippets')
  }

  return snippets
}

export default queryUsersSnippets
