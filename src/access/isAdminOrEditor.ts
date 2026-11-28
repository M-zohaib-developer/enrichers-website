import type { Access } from 'payload'

/** True when the request user has role=admin or role=editor. */
export const isAdminOrEditor: Access = ({ req }) =>
  req?.user?.role === 'admin' || req?.user?.role === 'editor'
