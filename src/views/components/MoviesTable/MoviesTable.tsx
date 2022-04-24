import React, { useState, VFC } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton/IconButton'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import TablePagination from '@mui/material/TablePagination'
import { MovieIdType, MovieObjectType } from './MoviesTable.types'
import MovieChannels, {
  useMovieChannelsHelpers,
} from './components/MovieChannels'
import MovieMedia, {
  MovieMediaEnum,
  MovieMediaProps,
} from './components/MovieMedia'
import Checkbox from '@mui/material/Checkbox/Checkbox'

export interface MoviesTableProps {
  rows: Array<MovieObjectType>
  page?: number
  perPage?: number
  onPageChange?: (page: number) => void
  totalCount?: number
}

const MoviesTable: VFC<MoviesTableProps> = ({
  rows,
  page,
  perPage,
  onPageChange,
  totalCount,
}) => {
  const [channelMovieObject, setChannelMovieObject] =
    useState<MovieObjectType | null>(null)
  const [mediaState, setMediaState] =
    useState<Pick<MovieMediaProps, 'movieId' | 'type'>>()

  const { getMovieChannels } = useMovieChannelsHelpers()

  const onChannelClick = (movieObject: MovieObjectType) => {
    setChannelMovieObject(
      movieObject.id === channelMovieObject?.id ? null : movieObject
    )
  }

  const onVideoClick = (movieId: MovieIdType): void =>
    setMediaState({ type: MovieMediaEnum.Video, movieId })

  const onThumbnailClick = (movieId: MovieIdType): void =>
    setMediaState({ type: MovieMediaEnum.Image, movieId })

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Images</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Votes</TableCell>
              <TableCell>Videos</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!rows?.length && (
              <TableRow>
                <TableCell colSpan={5}>No Item found</TableCell>
              </TableRow>
            )}

            {rows?.map?.((row) => (
              <TableRow key={row.id}>
                <TableCell width={100}>
                  {!!row.thumbnail && (
                    <img
                      style={{ cursor: 'pointer' }}
                      onClick={() => onThumbnailClick(row.id)}
                      width={100}
                      src={row.thumbnail}
                      alt={row.title}
                    />
                  )}
                </TableCell>

                <TableCell>
                  {row.title} {row.year ? ` (${row.year})` : ''}
                  <br />
                  {row.language}
                </TableCell>

                <TableCell>
                  <strong>{row.voteAverage}</strong>/10
                  <br />
                  from {row.voteCount} votes
                  <br />
                  <br />
                  Popularity: {row.popularity}
                </TableCell>

                <TableCell>
                  <IconButton
                    color="secondary"
                    size="medium"
                    disabled={row.id === mediaState?.movieId}
                    onClick={() => onVideoClick(row.id)}
                  >
                    <OndemandVideoIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  {channelMovieObject?.id === row.id ? null : (
                    <Checkbox
                      title="Add Movie to your list"
                      checked={!!(getMovieChannels(row.id)?.length ?? 0)}
                      onChange={() => onChannelClick(row)}
                      icon={<BookmarkBorderIcon />}
                      checkedIcon={<BookmarkAddedIcon color="success" />}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!!totalCount && !!page && onPageChange && (
        <TablePagination
          count={totalCount || 0}
          page={page - 1}
          onPageChange={(_, page) => onPageChange(page + 1)}
          rowsPerPage={perPage || 20}
          rowsPerPageOptions={[]}
          component="div"
        />
      )}

      <MovieMedia
        type={mediaState?.type}
        movieId={mediaState?.movieId}
        onClose={() => setMediaState(undefined)}
      />

      {!!channelMovieObject && (
        <MovieChannels
          movieObject={channelMovieObject}
          onClose={() => setChannelMovieObject(null)}
        />
      )}
    </>
  )
}

export default MoviesTable
