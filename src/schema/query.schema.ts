export interface QuerySchemas {
  searchMovie: {
    input: { searchText: string }
    output: [{ id: number | string; title: string }]
  }
  movieDetails: {
    input: { id: number | string }
    output: { id: number | string; title: string }
  }
}
