import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LyricData } from './lyricsData'

export function LyricCard({ lyric }: { lyric: LyricData }) {
  return (
    <article className="rounded-lg border bg-card text-card-foreground shadow-sm">
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
  )
}