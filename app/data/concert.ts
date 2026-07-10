export interface ConcertPhoto {
  /** Caption shown on the right + used by the status bar */
  title: string
  /** CSS aspect-ratio for the media box, e.g. "3 / 2" */
  aspect: string
  /** Caption shown on the left (defaults to AUTHOR) */
  name?: string
  /** Optional media path. Leave empty for a placeholder. */
  src?: string
  /** "photo" | "video" (defaults to photo). Videos use MagicPlayer. */
  type?: 'photo' | 'video'
}

export const CONCERT_HEADER = {
  title: 'concert photography',
}

export const concertPhotos: ConcertPhoto[] = [
{ title: 'sustainably developed super8 hand scanned', aspect: '3 / 2', type: 'video', src: 'https://stream.mux.com/ZDqyneaUSyAniGKTq6mEr1LEMdR63z02GngyWjyAJhp4.m3u8' },
{ title: 'magnus westwell 35mm', aspect: '16 / 9', type: 'photo', src: '/media/concert/197850030036.JPEG' },  
{ title: 'corto.alto hand developed 35mm', aspect: '16 / 9', type: 'photo', src: '/media/concert/IMG_7632.JPEG' },
{ title: 'saya grey digital', aspect: '3 / 4', type: 'photo', src: '/media/concert/580491625_18546999451005282_7200575144633889821_n.jpg' },
{ title: 'bina studio bts 35mm', aspect: '4 / 5', type: 'photo', src: '/media/concert/IMG_6695.JPEG' },
]
