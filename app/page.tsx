import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Lyrics Documentation</h1>
          <p className="text-xl mb-8">Your comprehensive guide to song lyrics</p>
          <Link
            href="/docs/introduction"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Explore Documentation
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}