'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Head from 'next/head'
import Link from 'next/link'
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
  {
    id: 4,
    title: "Red Carpet Moment",
    sections: [
      { type: 'verse', content: "Flashbulbs pop, the crowd goes wild,\nYour name in lights, fame reconciled.\nStrut your stuff, own the night,\nRed carpet rolled, future's bright." },
      { type: 'chorus', content: "This is your red carpet moment,\nGlamour and glitz, wholly owned.\nCameras flash, capture the scene,\nYou're the star of this dream." },
    ],
    category: "Performance",
  },
  {
    id: 5,
    title: "First Day of School",
    sections: [
      { type: 'verse', content: "Backpack ready, lunchbox packed,\nLittle steps, a world to be cracked.\nClassroom door, a portal new,\nFriends to make, knowledge to accrue." },
      { type: 'chorus', content: "First day jitters, butterflies dance,\nBut every step's a new chance.\nSchool bells ring, adventures start,\nLearning's journey captures the heart." },
    ],
    category: "Personal",
  },
  {
    id: 6,
    title: "Nature's Welcome",
    sections: [
      { type: 'verse', content: "Forest path, dappled light,\nNature's entrance, a wondrous sight.\nBirdsong greets, leaves whisper low,\nInto the wild, we quietly go." },
      { type: 'chorus', content: "Step into nature's warm embrace,\nFind your rhythm, find your place.\nEvery sense alive and free,\nWelcome to tranquility." },
    ],
    category: "Inspirational",
  },
  {
    id: 7,
    title: "Digital Frontier",
    sections: [
      { type: 'verse', content: "Login prompt, cursor blinks,\nVirtual world, full of links.\nAvatar primed, profile set,\nDigital entrance, no regret." },
      { type: 'chorus', content: "Enter the realm of ones and zeros,\nWhere data flows and info grows.\nYour digital self takes the stage,\nWelcome to the cyber age." },
    ],
    category: "Technology",
  },
]

const categories = ["All", ...Array.from(new Set(lyrics.map(lyric => lyric.category)))]

export default function EntrancePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredLyrics, setFilteredLyrics] = useState<LyricData[]>(lyrics)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  useEffect(() => {
    const filtered = lyrics.filter(lyric => 
      lyric.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || lyric.category === selectedCategory)
    )
    setFilteredLyrics(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const pageCount = Math.ceil(filteredLyrics.length / itemsPerPage)
  const paginatedLyrics = filteredLyrics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <Head>
        <title>Entrance Lyrics Examples | Lyric Writing Guide</title>
        <meta name="description" content="Explore a collection of entrance-themed lyrics, showcasing various songwriting techniques and structures. Perfect for aspiring songwriters and music enthusiasts." />
        <meta name="keywords" content="lyrics, songwriting, entrance, music, composition" />
        <meta property="og:title" content="Entrance Lyrics Examples | Lyric Writing Guide" />
        <meta property="og:description" content="Discover entrance-themed lyrics and songwriting techniques. Ideal for songwriters and music lovers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/docs/song-structure/entrance" />
        <link rel="canonical" href="https://yourdomain.com/docs/song-structure/entrance" />
      </Head>

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
              "genre": lyric.category,
              "text": lyric.sections.map(section => section.content).join("\n")
            }
          }))
        })}
      </Script>

      <main className="space-y-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Entrance Lyrics Examples</h1>
        <p className="text-lg text-muted-foreground">
          This page showcases examples of lyrics about entrances, demonstrating various techniques and structures in songwriting.
        </p>
        
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm text-muted-foreground">
            <li><Link href="/docs">Docs</Link></li>
            <li>&gt;</li>
            <li><Link href="/docs/song-structure">Song Structure</Link></li>
            <li>&gt;</li>
            <li aria-current="page">Entrance</li>
          </ol>
        </nav>
        
        <section aria-label="Lyric filters" className="w-full">
          <h2 className="sr-only">Lyric Filters</h2>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto">
              <Input
                type="search"
                placeholder="Search lyrics..."
                className="w-full"
                aria-label="Search lyrics"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className="flex-grow sm:flex-grow-0"
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
            {paginatedLyrics.map((lyric) => (
              <article key={lyric.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Card>
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
              </article>
            ))}
          </div>
        </section>

        <nav aria-label="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                  }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(pageCount)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    isActive={currentPage === i + 1}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => Math.min(prev + 1, pageCount));
                  }}
                  aria-disabled={currentPage === pageCount}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>
      </main>
    </>
  )
}