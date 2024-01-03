import { z } from 'zod'

export const MAX_SNIPPYS_PER_WORKSPACE = 150
export const MAX_FILES_PER_TEMPLATE = 20
export const MAX_FILE_SIZE = 20000

const PROMPT_MAX_LENGTH = 250
const PROMPT_VARIABLE_MAX_LENGTH = 50
const FILE_NAME_MAX_LENGTH = 100

export const promptSchema = z.object({
  id: z.string(),
  prompt: z
    .string()
    .min(1, 'Prompt can not be empty')
    .max(PROMPT_MAX_LENGTH, `Prompts must be at most ${PROMPT_MAX_LENGTH} characters`),
  variable: z
    .string()
    .min(1)
    .max(
      PROMPT_VARIABLE_MAX_LENGTH,
      `Prompt variables must be at most ${PROMPT_VARIABLE_MAX_LENGTH} characters`,
    ),
})

const fileSchema = z.object({
  type: z.literal('file'),
  id: z.string(),
  data: z.object({
    name: z
      .string()
      .min(1)
      .max(FILE_NAME_MAX_LENGTH, `File names must be at most ${FILE_NAME_MAX_LENGTH} characters`),
    content: z.string().max(MAX_FILE_SIZE, `At least one of the files is too large in size`),
    language: z.string(),
    justCreated: z.boolean().optional(),
  }),
})

const baseFolderSchema = z.object({
  type: z.literal('folder'),
  id: z.string(),
  data: z.object({
    name: z
      .string()
      .min(1)
      .max(FILE_NAME_MAX_LENGTH, `File names must be at most ${FILE_NAME_MAX_LENGTH} characters`),
    justCreated: z.boolean().optional(),
  }),
})

type FolderType = z.infer<typeof baseFolderSchema>

type FileItemType =
  | z.infer<typeof fileSchema>
  | (FolderType & {
      data: {
        files: FileItemType[]
      }
    })

const fileItemSchema: z.ZodType<FileItemType> = z.lazy(() =>
  z.union([
    fileSchema,
    baseFolderSchema.extend({
      data: baseFolderSchema.shape.data.extend({
        files: fileItemSchema.array(),
      }),
    }),
  ]),
)

export const createTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Snippy name can not be empty')
    .max(50, 'Snippy name must be at most 50 characters'),
  prompts: z.array(promptSchema),
  files: z.array(fileItemSchema),
})
export type CreateTemplate = z.infer<typeof createTemplateSchema>

export const updateTemplateSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, 'Snippy name can not be empty')
    .max(50, 'Snippy name must be at most 50 characters'),
  prompts: z.array(promptSchema),
  files: z.array(fileItemSchema),
  updatedAtLocal: z.date(),
  forceSave: z.boolean().optional(),
})
export type UpdateTemplate = z.infer<typeof updateTemplateSchema>

export const getTemplatesSchema = z.object({
  page: z.number(),
  query: z.string().optional(),
})
export type GetTemplates = z.infer<typeof getTemplatesSchema>

export const templateIdSchema = z.object({
  templateId: z.string({ required_error: 'Missing tempalate Id' }),
})
export type TemplateId = z.infer<typeof templateIdSchema>
