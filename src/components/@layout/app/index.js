import { useState } from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import Navigation from './navigation'
import Header from './header'


export default function LayoutApp({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Navigation sidebarOpen={sidebarOpen} onSidebarClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col md:pl-72">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button type="button" className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden" onClick={() => setSidebarOpen(true)} >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Header />
          </div>
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
