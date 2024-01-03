import { type z, type AnyZodObject } from 'zod'

const validateInput = <T extends z.infer<S>, S extends AnyZodObject>(
  data: unknown,
  schema: S,
): T => {
  const validate = schema.safeParse(data)

  if (!validate.success) {
    throw new Error(validate.error.issues[0]?.message)
  }

  return validate.data as T
}

export default validateInput
