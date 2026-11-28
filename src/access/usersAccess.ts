import type { Access, FieldAccess } from 'payload'

/** Admin can read every user; editor only their own record. */
export const usersReadAccess: Access = ({ req }) => {
  const role = req?.user?.role
  if (role === 'admin') return true
  if (role === 'editor') return { id: { equals: req.user!.id } }
  return false
}

/**
 * Admin can update any user. Editor can update their own non-role fields
 * (email/password). Field-level `role` access blocks editors from self-promoting.
 */
export const usersUpdateAccess: Access = ({ req }) => {
  const role = req?.user?.role
  if (role === 'admin') return true
  if (role === 'editor') return { id: { equals: req.user!.id } }
  return false
}

/** `role` field: admin reads/writes anyone; editor can READ their own but never WRITE it. */
export const roleFieldRead: FieldAccess = ({ req, doc }) => {
  const u = req?.user
  if (!u) return false
  if (u.role === 'admin') return true
  if (u.role === 'editor') return doc?.id === u.id
  return false
}

export const roleFieldUpdate: FieldAccess = ({ req }) => req?.user?.role === 'admin'
