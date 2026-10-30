'use client'

import { useEffect } from 'react'

const PASSWORD = '••••••••••••'
const EMAIL = 'name@enrichers.com.pk'

const LoginPlaceholders = () => {
  useEffect(() => {
    const apply = (): boolean => {
      const password = document.querySelector<HTMLInputElement>("input[name='password']")
      const email = document.querySelector<HTMLInputElement>("input[name='email']")

      if (password) password.placeholder = PASSWORD
      if (email) email.placeholder = EMAIL

      return Boolean(password && email)
    }

    if (apply()) return

    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}

export default LoginPlaceholders
