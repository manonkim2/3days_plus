import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-center h-screen content-center flex items-center">
      {children}
    </div>
  )
}

export default AuthLayout
