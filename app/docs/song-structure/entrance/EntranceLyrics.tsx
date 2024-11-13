'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useInView } from 'react-intersection-observer'
import { LyricData } from './lyricsData'

export default function EntranceLyrics({ initialLyrics, allLyrics }: { initialLyrics: LyricData[], allLyrics: LyricData[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredLyrics, setFilteredLyrics] = useState<LyricData[]>(initialLyrics)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const categories = ["All", ...Array.from(new Set(allLyrics.map(lyric => lyric.category)))]

  useEffect(() => {
    if (inView) {
      const moreData = allLyrics.slice(filteredLyrics.length, filteredLyrics.length + itemsPerPage)
      setFilteredLyrics(prev => [...prev, ...moreData])
    }
  }, [inView, filteredLyrics.length, allLyrics])

  useEffect(() => {
    const filtered = allLyrics.filter(lyric => 
      lyric.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || lyric.category === selectedCategory)
    )
    setFilteredLyrics(filtered.slice(0, itemsPerPage))
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, allLyrics])

  const paginatedLyrics = filteredLyrics.slice(0, currentPage * itemsPerPage)

  const loadMore = () => {
    const nextPage = currentPage + 1
    const moreData = allLyrics.slice(paginatedLyrics.length, nextPage * itemsPerPage)
    setFilteredLyrics(prev => [...prev, ...moreData])
    setCurrentPage(nextPage)
  }

  return (
    <>
      <section aria-label="Lyric filters" className="w-full">
        <h2 className="sr-only">Lyric Filters</h2>
        <div className="flex flex-col space-y-4">
          <div className="w-full">
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
                className="flex-grow sm:flex-grow-0 text-sm"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      <section aria-label="Lyrics collection">
        <h2 className="sr-only">Lyrics Collection</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {paginatedLyrics.map((lyric) => (
            <article key={lyric.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <Card>
                <CardHeader>
                  <h2 id={`song-${lyric.id}`} className="text-xl sm:text-2xl font-semibold">{lyric.title}</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lyric.sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-base sm:text-lg font-semibold capitalize">{section.type}</h3>
                        <p className={`whitespace-pre-line text-sm sm:text-base ${section.type === 'chorus' ? 'italic' : ''}`}>
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
        {filteredLyrics.length < allLyrics.length && (
          <div ref={ref} className="mt-8 text-center">
            <Button onClick={loadMore} className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Load More
            </Button>
          </div>
        )}
      </section>
    </>
  )
}