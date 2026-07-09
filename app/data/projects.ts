export interface Project {
  /** Caption shown on the right + in the bottom bar */
  title: string
  /** CSS aspect-ratio for the media box, e.g. "3 / 4" */
  aspect: string
  /** Caption shown on the left (defaults to AUTHOR) */
  name?: string
  /** Optional link target */
  href?: string
  /** Optional media path. Leave empty for a placeholder. */
  src?: string
  /** "image" | "video" (defaults to image). Videos use MagicPlayer. */
  type?: 'image' | 'video'
}

export const AUTHOR = 'grace richardson'

export const projects: Project[] = [
  {
    title: 'project one',
    aspect: '3 / 4',
    type: 'video',
    src: 'https://stream.mux.com/5U11IitWbhtIYEC2yZ2m1R02EaBpr00yZV00V11Sn0200LwQ/capped-1080p.mp4',
  },
  { title: 'project two', aspect: '16 / 9' },
  { title: 'project three', aspect: '4 / 5' },
  { title: 'project four', aspect: '16 / 9' },
  { title: 'project five', aspect: '16 / 9' },
  { title: 'project six', aspect: '3 / 4' },
  { title: 'project seven', aspect: '4 / 5' },
  { title: 'project eight', aspect: '3 / 4' },
  { title: 'project nine', aspect: '16 / 9' },
  { title: 'project ten', aspect: '4 / 5' },
]
