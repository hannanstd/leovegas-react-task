import { usePersistSharedState } from 'hooks'
import config from 'App.config'
import { MovieIdType, MovieObjectType } from 'views/components/MoviesTable'

export enum StorageKey {
  MoviesObject = '__movies',
  MovieIdsByChannelName = '__channels__movie_ids',
}

const useMovieChannelsHelpers = () => {
  /*https://www.themoviedb.org/talk/626533e67caa4714b5007b51?page=1#6265a6b67caa4714b4e9c562*/
  /*as you see in link above, I have to store movie objects in storage*/
  const [moviesObject, setMoviesObject] = usePersistSharedState<
    Record<string, MovieObjectType>
  >(StorageKey.MoviesObject, {})

  const [movieIdsByChannelName, setMovieIdsByChannelName] =
    usePersistSharedState<Record<string, Array<MovieIdType>>>(
      StorageKey.MovieIdsByChannelName,
      () =>
        config.INITIAL_CHANNELS.reduce((movieIdsByChannelName, channelName) => {
          return { ...movieIdsByChannelName, [channelName]: [] }
        }, {})
    )

  const addChannel = (channelName: string): void => {
    setMovieIdsByChannelName({
      ...movieIdsByChannelName,
      [channelName]: movieIdsByChannelName?.[channelName] || [],
    })
  }

  const removeChannel = (channelName: string): void => {
    const newMovieIdsByChannelName = { ...movieIdsByChannelName }
    delete newMovieIdsByChannelName[channelName]
    setMovieIdsByChannelName(newMovieIdsByChannelName)
  }

  const renameChannel = (
    oldChannelName: string,
    newChannelName: string
  ): void => {
    let newMovieIdsByChannelName = {}
    Object.keys(movieIdsByChannelName).forEach((channelName) => {
      if (channelName === oldChannelName) {
        newMovieIdsByChannelName = {
          ...newMovieIdsByChannelName,
          ...{
            [newChannelName]: movieIdsByChannelName?.[oldChannelName] || [],
          },
        }
      } else {
        newMovieIdsByChannelName = {
          ...newMovieIdsByChannelName,
          [channelName]: movieIdsByChannelName[channelName],
        }
      }
    })

    setMovieIdsByChannelName(newMovieIdsByChannelName)
  }

  const getAllChannels = (): Array<string> => {
    return Object.keys(movieIdsByChannelName)
  }

  const addMovieToChannels = (
    movieObject: MovieObjectType,
    channelNames: string[]
  ): void => {
    setMoviesObject({ ...moviesObject, [movieObject.id]: movieObject })
    setMovieIdsByChannelName(
      channelNames.reduce((movieIdsByChannelName, channelName) => {
        return {
          ...movieIdsByChannelName,
          [channelName]: Array.from(
            new Set([
              ...(movieIdsByChannelName?.[channelName] || []),
              movieObject.id,
            ])
          ),
        }
      }, movieIdsByChannelName)
    )
  }

  const removeMovieFromChannels = (
    movieId: MovieIdType,
    channelNames: string[]
  ): void => {
    setMovieIdsByChannelName(
      channelNames.reduce((movieIdsByChannelName, channelName) => {
        return {
          ...movieIdsByChannelName,
          [channelName]: (movieIdsByChannelName?.[channelName] || []).filter(
            (item) => item !== movieId
          ),
        }
      }, movieIdsByChannelName)
    )
  }

  const getMovieChannels = (movieId: MovieIdType): Array<string> => {
    return Object.keys(movieIdsByChannelName).reduce(
      (channelNames, channelName) => {
        const movieIds: Array<MovieIdType> = movieIdsByChannelName[channelName]
        if (movieIds.includes(movieId)) channelNames.push(channelName)
        return channelNames
      },
      [] as Array<string>
    )
  }

  const getChannelMovies = (
    channelName: string
  ): Array<MovieObjectType> | [] => {
    return (
      (movieIdsByChannelName?.[channelName] || [])
        .map((movieId: MovieIdType) => moviesObject?.[movieId])
        .filter(Boolean) || []
    ).reverse()
  }

  const isMovieInAnyChannel = (movieId: MovieIdType): boolean => {
    return Object.values(movieIdsByChannelName).some(
      (movieIds: Array<MovieIdType>) => movieIds.includes(movieId)
    )
  }

  const isMovieInChannel = (
    movieId: MovieIdType,
    channelName: string
  ): boolean => {
    const movieIds: Array<MovieIdType> =
      movieIdsByChannelName?.[channelName] || []
    return movieIds.includes(movieId)
  }

  return {
    addChannel,
    removeChannel,
    renameChannel,
    getAllChannels,
    addMovieToChannels,
    removeMovieFromChannels,
    getMovieChannels,
    getChannelMovies,
    isMovieInChannel,
    isMovieInAnyChannel,
  }
}

export default useMovieChannelsHelpers
