export type Author = {
  readonly key: string
  first_name: string
  last_name: string
}

export type Book = {
  readonly key: string
  author_id: string
  createt_at?: number
  image?: string
  title: string
  year: number,
  description?: string
}