import { QueryRequests } from 'types/ApiTypes'

const queries: QueryRequests = {
  movieDetails: (variables) => ({
    endpoint: `movie/${variables.id}`,
    resolver: (data) => ({
      id: data.id,
      title: data.title,
    }),
  }),
  searchMovie: (variables) => ({
    endpoint: `search/movie`,
    queryParams: {
      query: variables.searchText,
      page: 1 /*todo*/,
      include_adult: false,
      language: 'en-US',
    },
    resolver: (data) =>
      data?.results?.map?.((item: any) => ({
        id: item.id,
        title: item.title,
      })),
  }),
}

export default queries
