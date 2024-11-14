import { Suspense } from 'react'
import EntranceLyrics from './EntranceLyrics'
import { lyrics } from './lyricsData'
import Script from 'next/script'

export default function EntrancePage() {
  return (
    <>
      <Script id="lyrics-schema" type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Entrance Hymns from With Joyful Lips",
    "description": "A collection of entrance hymns from the With Joyful Lips books",
    "itemListElement": lyrics.map((lyric, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "MusicComposition",
        "name": lyric.title,
        "musicCompositionForm": "Hymn",
        "genre": "Christian",
        "lyrics": lyric.sections.map(section => section.content).join("\n")
      }
    }))
  })}
</Script>

      <main className="space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mt-4">Entrance Hymns from With Joyful Lips</h1>
        <p className="text-base sm:text-lg text-muted-foreground">
        This page showcases list of entrance hymns from the With Joyful Lips book.
        </p>

        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap space-x-2 text-muted-foreground">
            <li><a href="/lyrics" className="hover:text-primary">Lyrics</a></li>
            <li>&gt;</li>
            <li><a href="/lyrics/with-joyful-lips" className="hover:text-primary">With Joyful Lips</a></li>
            <li>&gt;</li>
            <li aria-current="page">Entrance Hymns</li>
          </ol>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <EntranceLyrics initialLyrics={lyrics.slice(0, 4)} allLyrics={lyrics} />
        </Suspense>
      </main>
    </>
  )
}