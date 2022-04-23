export interface QuerySchemas {
  searchMovie: {
    input: { searchText: string; page?: number }
    output: {
      items: [
        {
          id: number | string
          title: string
          thumbnail: string | null
          year: number
          overview: string
          date: string
          language: string
          voteAverage: number
          voteCount: number
          popularity: number
          adult: boolean
        }
      ]
      meta: { totalCount: number; page: number; totalPage: number }
    }
  }
  movieVideos: {
    input: { id: number | string }
    output: string[]
  }
  movieImages: {
    input: { id: number | string }
    output: string[]
  }
  movieDetails: {
    input: { id: number | string }
    output: { id: number | string; title: string }
  }
}
