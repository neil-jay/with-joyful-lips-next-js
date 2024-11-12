import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface LyricSection {
  type: 'verse' | 'chorus' | 'bridge';
  content: string;
}

export interface LyricProps {
  title: string;
  sections: LyricSection[];
}

export function Lyric({ title, sections }: LyricProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <section key={index}>
              <h3 className="text-lg font-semibold capitalize">{section.type}</h3>
              <p className={`whitespace-pre-line ${section.type === 'chorus' ? 'italic' : ''}`}>
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}