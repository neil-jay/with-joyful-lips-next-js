import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrance Hymns | With Joyful Lips',
  description: 'Explore a collection of entrance hymns from the With Joyful Lips books, showcasing various songwriting techniques and structures.',
  keywords: 'entrance hymns, With Joyful Lips, lyrics, songwriting, worship music',
  openGraph: {
    title: 'Entrance Hymns | With Joyful Lips',
    description: 'Discover entrance hymns and songwriting techniques from the With Joyful Lips collection.',
    url: 'https://yourdomain.com/lyrics/with-joyful-lips/entrance-hymns',
  },
}

export default function EntranceHymnsLayout({
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