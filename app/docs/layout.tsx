'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"

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

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background">
        <div className="sticky top-0 h-screen overflow-y-auto p-4">
          <div className="flex items-center gap-2 pb-4">
            <span className="text-2xl">🎵</span>
            <Link href="/" className="font-bold">
              Lyrics Docs
            </Link>
          </div>
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
        <div className="container max-w-3xl py-6 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}