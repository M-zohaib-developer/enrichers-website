import type { Access, FieldAccess } from 'payload'

/** True when the request user has role=admin. */
export const isAdmin: Access = ({ req }) => req?.user?.role === 'admin'

/** Field-level variant: same check, signature compatible with field access. */
export const isAdminField: FieldAccess = ({ req }) => req?.user?.role === 'admin'
