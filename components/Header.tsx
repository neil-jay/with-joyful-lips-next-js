import Link from 'next/link'
import { Music, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Music className="h-6 w-6" />
          <span className="font-bold hidden sm:inline-block">Lyrics Docs</span>
        </Link>
        <div className="flex-1 mx-4 max-w-md relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-8"
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}