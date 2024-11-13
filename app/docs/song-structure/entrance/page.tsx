import { Suspense } from 'react'
import EntranceLyrics from './EntranceLyrics'
import { lyrics } from './lyricsData'

export default function EntrancePage() {
  return (
    <main className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mt-4">Entrance Lyrics Examples</h1>
      <p className="text-base sm:text-lg text-muted-foreground">
        This page showcases examples of lyrics about entrances, demonstrating various techniques and structures in songwriting.
      </p>
      
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap space-x-2 text-muted-foreground">
          <li><a href="/docs" className="hover:text-primary">Docs</a></li>
          <li>&gt;</li>
          <li><a href="/docs/song-structure" className="hover:text-primary">Song Structure</a></li>
          <li>&gt;</li>
          <li aria-current="page">Entrance</li>
        </ol>
      </nav>
      
      <Suspense fallback={<div>Loading...</div>}>
        <EntranceLyrics initialLyrics={lyrics.slice(0, 4)} allLyrics={lyrics} />
      </Suspense>
    </main>
  )
}