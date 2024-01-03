import { z } from 'zod'

export const MAX_WORKSPACES_PER_ACCOUNT = 3
export const MAX_MEMBERS_PER_WORKSPACE = 10

const NAME_MAX_LENGTH = 100

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, 'Workspace name can not be empty')
    .max(NAME_MAX_LENGTH, `The workspace name must be at most ${NAME_MAX_LENGTH} characters`),
})
export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>

export const updateWorkspaceSchema = z.object({
  workspaceId: z.string(),
  name: z
    .string()
    .min(1, 'Workspace name can not be empty')
    .max(NAME_MAX_LENGTH, `The workspace name must be at most ${NAME_MAX_LENGTH} characters`),
})
export type UpdateWorkspace = z.infer<typeof updateWorkspaceSchema>

export const addWorkspaceMembersSchema = z.object({
  workspaceId: z.string(),
  emails: z.string().email().array().min(1),
})
export type AddWorkspaceMembers = z.infer<typeof addWorkspaceMembersSchema>

export const removeWorkspaceMemberSchema = z.object({
  workspaceId: z.string(),
  memberId: z.string(),
})
export type RemoveWorkspaceMember = z.infer<typeof removeWorkspaceMemberSchema>

export const workspaceIdSchema = z.object({
  workspaceId: z.string({ required_error: 'Missing workspace Id' }),
})
export type WorkspaceId = z.infer<typeof workspaceIdSchema>
