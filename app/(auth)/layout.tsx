
import React, { ReactNode } from 'react'

const Layout = ({ children } : { children : ReactNode }) => {
  return (
    <main className='flex w-full min-h-screen items-center justify-center'>
        {children}
    </main>
  )
}

export default Layout