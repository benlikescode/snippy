import fetch from 'node-fetch'
import { Template } from '../types'

const queryUsersTemplates = async () => {
  const res = await fetch('http://localhost:3000/api/templates')
  const data = await res.json()

  if (!data || !data.templates) {
    throw new Error('Failed to get your templates')
  }

  return data.templates as Template[]
}

export default queryUsersTemplates
