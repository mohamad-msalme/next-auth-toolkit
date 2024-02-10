import React from 'react'
import { NavBar } from './_components/NavBar'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
