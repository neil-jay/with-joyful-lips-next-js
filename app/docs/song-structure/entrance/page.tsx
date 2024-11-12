'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Script from 'next/script'

interface LyricSection {
  type: 'verse' | 'chorus' | 'bridge';
  content: string;
}

interface LyricData {
  id: number;
  title: string;
  sections: LyricSection[];
  category: string;
}

const lyrics: LyricData[] = [
  {
    id: 1,
    title: "Grand Entrance",
    sections: [
      { type: 'verse', content: "Lights dim, anticipation grows,\nThe crowd hushes, excitement flows.\nA silhouette behind the curtain,\nThe moment's arrival is certain." },
      { type: 'chorus', content: "Make your entrance, take the stage,\nYour presence sets the world ablaze.\nEvery eye is fixed on you,\nThis is your moment, shining through." },
    ],
    category: "Performance",
  },
  {
    id: 2,
    title: "Welcome Home",
    sections: [
      { type: 'verse', content: "Key turns in the lock, familiar sound,\nFootsteps echo, you're on known ground.\nThe scent of home fills the air,\nMemories flood, beyond compare." },
      { type: 'chorus', content: "Welcome home, where you belong,\nWhere your heart sings its own song.\nSafe haven from the world outside,\nIn these walls, your joy resides." },
    ],
    category: "Personal",
  },
  {
    id: 3,
    title: "New Beginnings",
    sections: [
      { type: 'verse', content: "First day nerves, a world unknown,\nBut potential waits, seeds unsown.\nNew faces, new places to explore,\nA chapter opens, what's in store?" },
      { type: 'chorus', content: "Step through the door, embrace the new,\nAdventures await, dreams come true.\nYour entrance marks a fresh start,\nWrite your story, follow your heart." },
      { type: 'bridge', content: "Every end is a new beginning,\nEvery entrance, a chance for winning.\nFear may linger, but courage leads,\nYour journey starts as you proceed." },
    ],
    category: "Inspirational",
  },
]

const categories = ["All", ...Array.from(new Set(lyrics.map(lyric => lyric.category)))]

export default function EntrancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredLyrics, setFilteredLyrics] = useState<LyricData[]>(lyrics)

  useEffect(() => {
    const filtered = lyrics.filter(lyric => 
      lyric.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || lyric.category === selectedCategory)
    )
    setFilteredLyrics(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <>
      <Script id="lyrics-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": lyrics.map((lyric, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "CreativeWork",
              "name": lyric.title,
              "genre": lyric.category
            }
          }))
        })}
      </Script>

      <main className="space-y-8">
        <h1 className="text-3xl font-bold">Entrance Lyrics Examples</h1>
        <p className="text-lg text-muted-foreground">
          This page showcases examples of lyrics about entrances, demonstrating various techniques and structures in songwriting.
        </p>
        
        <section aria-label="Lyric filters">
          <h2 className="sr-only">Lyric Filters</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="search"
              placeholder="Search lyrics..."
              className="max-w-sm"
              aria-label="Search lyrics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        <section aria-label="Lyrics collection">
          <h2 className="sr-only">Lyrics Collection</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredLyrics.map((lyric) => (
              <Card key={lyric.id}>
                <CardHeader>
                  <h2 id={`song-${lyric.id}`} className="text-2xl font-semibold">{lyric.title}</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lyric.sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold capitalize">{section.type}</h3>
                        <p className={`whitespace-pre-line ${section.type === 'chorus' ? 'italic' : ''}`}>
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}