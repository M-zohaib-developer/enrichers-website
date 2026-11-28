import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import {
  roleFieldRead,
  roleFieldUpdate,
  usersReadAccess,
  usersUpdateAccess,
} from '@/access/usersAccess'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role'],
  },
  auth: true,
  access: {
    // Only admin can provision accounts or remove them. Editors are read-only
    // on their own record (needed for the account menu + the UI's role check).
    create: isAdmin,
    read: usersReadAccess,
    update: usersUpdateAccess,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      admin: { position: 'sidebar' },
      access: {
        // Editors may READ their own role so the admin UI can gate controls,
        // but may NEVER write role on any record — closes the self-promotion
        // path a crafted PATCH could otherwise take.
        read: roleFieldRead,
        update: roleFieldUpdate,
        create: roleFieldUpdate,
      },
    },
  ],
}
