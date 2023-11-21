import fetch from 'node-fetch'
import { Snippet } from '../types'

const getSnippets = async () => {
  const res = await fetch('http://localhost:3000/api/snippets')
  const data = await res.json()

  if (!data || !data.snippets) {
    throw new Error('Failed to get your snippets')
  }

  return data.snippets as Snippet[]
}

export default getSnippets
