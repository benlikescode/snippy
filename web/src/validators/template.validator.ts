import { z } from 'zod'

export const templateSchema = z.object({
  name: z.string().min(1).max(50),
})
