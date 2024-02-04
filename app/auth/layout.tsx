import React from 'react'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex h-full flec-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      {children}
    </main>
  )
}

export default Layout
