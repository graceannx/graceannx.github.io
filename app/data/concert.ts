export interface ConcertPhoto {
  /** Caption shown on the right + used by the status bar */
  title: string
  /** CSS aspect-ratio for the media box, e.g. "3 / 2" */
  aspect: string
  /** Caption shown on the left (defaults to AUTHOR) */
  name?: string
  /** Optional media path. Leave empty for a placeholder. */
  src?: string
}

export const CONCERT_HEADER = {
  title: 'live',
  subtitle: 'concerts & moving image',
  intro:
    'A running series shot front-of-house and backstage — light, motion and noise.',
}

export const concertPhotos: ConcertPhoto[] = [
  { title: 'opening set', aspect: '3 / 2' },
  { title: 'strobe', aspect: '4 / 5' },
  { title: 'crowd surge', aspect: '16 / 9' },
  { title: 'the pit', aspect: '3 / 4' },
  { title: 'encore', aspect: '3 / 2' },
  { title: 'house lights', aspect: '16 / 9' },
  { title: 'backstage', aspect: '4 / 5' },
  { title: 'last note', aspect: '3 / 2' },
]
