'use client'

import { createContext, useContext, useState } from 'react'

export interface UserInfo {
  id: string
  name: string
  email: string
  image_url: string
  social: string
  updated_at: string
}

const UserContext = createContext<{
  user: UserInfo | null
  setUser: (user: UserInfo | null) => void
}>({
  user: null,
  setUser: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
