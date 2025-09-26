import TopBar from './TopBar'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] bg-gradient-to-b from-gray-50 to-white">
      <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="grid grid-cols-[auto_1fr_auto] h-[calc(100vh-56px)]">
        {sidebarOpen ? <Sidebar /> : <div className="w-0" />}
        <main className="overflow-y-auto">{children}</main>
        <RightPanel />
      </div>
    </div>
  )
}
