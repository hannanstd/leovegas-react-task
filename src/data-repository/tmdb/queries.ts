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
      page: variables?.page || 1,
      include_adult: true,
      language: 'en-US',
    },
    resolver: (data) => ({
      items: data?.results?.map?.((item: any) => ({
        id: item?.id,
        title: item?.title,
        thumbnail: item?.poster_path
          ? `https://image.tmdb.org/t/p/w200/${item?.poster_path}`
          : null,
        year: item?.release_date?.split('-')?.[0] || null,
        date: item?.release_date,
        overview: item?.overview,
        language: item?.original_language,
        voteAverage: item?.vote_average,
        voteCount: item?.vote_count,
        popularity: item?.popularity,
        adult: !!item?.adult,
      })),
      meta: {
        totalCount: data?.total_results,
        page: data?.page,
        totalPage: data?.total_pages,
      },
    }),
  }),
}

export default queries