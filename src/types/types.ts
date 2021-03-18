export type Author = {
  key: string
  first_name: string
  last_name: string
}

export type Book = {
  key: string
  author_id: string
  createt_at?: number
  image?: string
  title: string
  year: number
}