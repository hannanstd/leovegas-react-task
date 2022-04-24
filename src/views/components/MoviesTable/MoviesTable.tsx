import React, { useState, VFC } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import ButtonGroup from '@mui/material/ButtonGroup'
import IconButton from '@mui/material/IconButton/IconButton'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import TablePagination from '@mui/material/TablePagination'
import { QuerySchemas } from 'schema/query.schema'
import MovieMedia, {
  MovieMediaProps,
  MovieMediaEnum,
} from './components/MovieMedia'

export interface MoviesTableProps {
  rows: QuerySchemas['searchMovie']['output']['items']
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
  const [mediaState, setMediaState] =
    useState<Pick<MovieMediaProps, 'id' | 'type'>>()

  const onVideoClick = (id: string | number): void => {
    setMediaState({ type: MovieMediaEnum.Video, id })
  }

  const onThumbnailClick = (id: string | number): void => {
    setMediaState({ type: MovieMediaEnum.Image, id })
  }

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
            </TableRow>
          </TableHead>

          <TableBody>
            {!rows?.length && (
              <TableRow>
                <TableCell colSpan={4}>No Item found</TableCell>
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
                  <ButtonGroup variant="text">
                    <IconButton
                      color="secondary"
                      size="medium"
                      disabled={row.id === mediaState?.id}
                      onClick={() => onVideoClick(row.id)}
                    >
                      <OndemandVideoIcon />
                    </IconButton>
                  </ButtonGroup>
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
        id={mediaState?.id}
        onClose={() => setMediaState(undefined)}
      />
    </>
  )
}

export default MoviesTable
