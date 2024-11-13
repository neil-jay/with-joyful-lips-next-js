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
    setFilteredLyrics(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, allLyrics])

  const pageCount = Math.ceil(filteredLyrics.length / itemsPerPage)
  const paginatedLyrics = filteredLyrics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
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
            <article key={`lyric-${lyric.id}`} className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <Card>
                <CardHeader>
                  <h2 id={`song-title-${lyric.id}`} className="text-xl sm:text-2xl font-semibold">{lyric.title}</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lyric.sections.map((section, index) => (
                      <div key={`${lyric.id}-${index}`}>
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
      </section>

      <nav aria-label="Pagination" className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.max(currentPage - 1, 1));
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={`page-${page}`} className="hidden sm:inline-block">
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.min(currentPage + 1, pageCount));
                }}
                aria-disabled={currentPage === pageCount}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </nav>
    </>
  )
}