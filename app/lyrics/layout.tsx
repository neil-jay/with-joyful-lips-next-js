'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Menu, X } from 'lucide-react'

const sidebarItems = [
  {
    title: "Getting Started",
    icon: "📚",
    items: [
      { title: "Introduction", href: "/lyrics/introduction" },
    ],
  },
  {
    title: "Song Structure",
    icon: "🎵",
    items: [
      { title: "Entrance", href: "/lyrics/with-joyful-lips/entrance-hymns" },
    ],
  },
  // {
  //   title: "Legal",
  //   icon: "🎤",
  //   items: [
  //     { title: "Terms of Service", href: "/docs/lyric-writing/terms" },
  //     { title: "Copyright", href: "/docs/lyric-writing/copyright" },
  //   ],
  // },
]

interface TableOfContentsItem {
  title: string
  url: string
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0% -85% 0%' }
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])

  useEffect(() => {
    const generateToc = () => {
      const headings = document.querySelectorAll('h2:not(.sr-only)')
      const items: TableOfContentsItem[] = Array.from(headings).map((heading) => ({
        title: heading.textContent || '',
        url: `#${heading.id}`,
      }))
      setTableOfContents(items)
    }

    generateToc()

    // Re-generate ToC when filtered lyrics change
    const observer = new MutationObserver(generateToc)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pathname])

  const activeItem = useActiveItem(tableOfContents.map((item) => item.url.slice(1)))

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const headerOffset = 100 // Adjust this value based on your header height and desired offset
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Set focus to the target element for accessibility
      targetElement.tabIndex = -1
      targetElement.focus({ preventScroll: true })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:sticky top-14 z-30 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r bg-background transition-all duration-300`}>
          <div className="p-4">
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
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6 lg:py-10 px-4 sm:px-6">
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
        <div className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-6 pl-6">
            <h4 className="mb-4 text-sm font-semibold">On this page</h4>
            <nav className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={(e) => handleSmoothScroll(e, item.url)}
                  className={`block text-sm transition-colors hover:text-foreground ${
                    activeItem === item.url.slice(1)
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}