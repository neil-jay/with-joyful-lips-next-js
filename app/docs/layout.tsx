'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Menu, X } from 'lucide-react'

const sidebarItems = [
  {
    title: "Getting Started",
    icon: "📚",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Song Structure",
    icon: "🎵",
    items: [
      { title: "Verses", href: "/docs/song-structure/verses" },
      { title: "Chorus", href: "/docs/song-structure/chorus" },
      { title: "Bridge", href: "/docs/song-structure/bridge" },
    ],
  },
  {
    title: "Lyric Writing",
    icon: "🎤",
    items: [
      { title: "Rhyme Schemes", href: "/docs/lyric-writing/rhyme-schemes" },
      { title: "Metaphors", href: "/docs/lyric-writing/metaphors" },
      { title: "Storytelling", href: "/docs/lyric-writing/storytelling" },
    ],
  },
  {
    title: "Advanced Techniques",
    icon: "⚙️",
    items: [
      { title: "Wordplay", href: "/docs/advanced-techniques/wordplay" },
      { title: "Alliteration", href: "/docs/advanced-techniques/alliteration" },
      { title: "Assonance", href: "/docs/advanced-techniques/assonance" },
    ],
  },
]

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:sticky top-14 z-30 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r bg-background transition-all duration-300`}>
          <div className="p-4">
            <div className="relative mb-4">
              <span className="absolute left-2.5 top-2.5 text-muted-foreground">🔍</span>
              <Input
                type="search"
                placeholder="Search documentation..."
                className="w-full pl-8"
              />
            </div>
            <nav className="space-y-4">
              {sidebarItems.map((group, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground/70">
                    <span>{group.icon}</span>
                    {group.title}
                  </div>
                  <div className="ml-4 space-y-1">
                    {group.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className={`block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted ${
                          pathname === item.href ? 'bg-muted font-medium text-foreground' : 'text-foreground/70'
                        }`}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto md:ml-64">
          <div className="container max-w-3xl py-6 lg:py-10">
            {isMobile && (
              <Button
                onClick={toggleSidebar}
                className="mb-4 md:hidden"
                variant="outline"
                size="icon"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            )}
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}