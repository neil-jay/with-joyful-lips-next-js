import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrance Lyrics Examples | Lyric Writing Guide',
  description: 'Explore a collection of entrance-themed lyrics, showcasing various songwriting techniques and structures. Perfect for aspiring songwriters and music enthusiasts.',
  keywords: 'lyrics, songwriting, entrance, music, composition',
  openGraph: {
    title: 'Entrance Lyrics Examples | Lyric Writing Guide',
    description: 'Discover entrance-themed lyrics and songwriting techniques. Ideal for songwriters and music lovers.',
    type: 'website',
    url: 'https://yourdomain.com/docs/song-structure/entrance',
  },
}

export default function EntranceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}