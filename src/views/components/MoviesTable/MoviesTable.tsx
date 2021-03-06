import React, { Fragment, useState, VFC } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TablePagination from '@mui/material/TablePagination'
import Transition from '@mui/material/Fade'
import { MovieIdType, MovieObjectType } from 'types/Movies.types'
import useStyles from './MoviesTable.styles'
import {
  MovieChannelsModal,
  useMovieChannelsHelpers,
} from 'views/components/MovieChannels'
import MovieMedia, {
  MovieMediaEnum,
  MovieMediaProps,
} from './components/MovieMedia'
import ActionCell from './components/TableCells/ActionCell'
import DescriptionCell from './components/TableCells/DescriptionCell'
import ThumbnailCell from './components/TableCells/ThumbnailCell'
import TitleCell from './components/TableCells/TitleCell'
import MediaCell from './components/TableCells/MediaCell'
import VoteCell from './components/TableCells/VoteCell'

export interface MoviesTableCellsProps {
  row: MovieObjectType
}

export interface MoviesTableProps {
  rows: Array<MovieObjectType>
  page?: number
  perPage?: number
  onPageChange?: (page: number) => void
  totalCount?: number
}

type MediaState = Pick<MovieMediaProps, 'movieId' | 'type'>

const MoviesTable: VFC<MoviesTableProps> = ({
  rows,
  page,
  perPage,
  onPageChange,
  totalCount,
}) => {
  const classes = useStyles()

  const [mediaState, setMediaState] = useState<MediaState>()
  const [collapsedIds, setCollapsedIds] = useState<MovieIdType[]>([])
  const [channelMovieObject, setChannelMovieObject] =
    useState<MovieObjectType | null>(null)

  const { getMovieChannels } = useMovieChannelsHelpers()

  const onChannelClick = (movieObject: MovieObjectType) => {
    setChannelMovieObject(
      movieObject.id === channelMovieObject?.id ? null : movieObject
    )
  }

  const onVideoClick = (movieId: MovieIdType): void =>
    setMediaState({ type: MovieMediaEnum.Video, movieId })

  const onImageClick = (movieId: MovieIdType): void =>
    setMediaState({ type: MovieMediaEnum.Image, movieId })

  const onCollapseChange = (movieId: MovieIdType, isCollapsed: boolean) => {
    if (isCollapsed) {
      setCollapsedIds([...collapsedIds, movieId])
    } else {
      setCollapsedIds(collapsedIds.filter((id) => id !== movieId))
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Images</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Votes</TableCell>
              <TableCell>Media</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!rows?.length && (
              <TableRow>
                <TableCell colSpan={5}>No Item found</TableCell>
              </TableRow>
            )}

            {rows?.map?.((row, index) => {
              const isCollapsed: boolean = collapsedIds.includes(row.id)
              return (
                <Fragment key={row.id}>
                  <TableRow
                    className={classes.tableRow}
                    data-testid="table-row"
                  >
                    <TableCell
                      align="center"
                      data-testid={`cell-thumbnail-${index}`}
                      className={classes.thumbnailCell}
                    >
                      <ThumbnailCell row={row} onClick={onImageClick} />
                    </TableCell>

                    <TableCell data-testid={`cell-title-${index}`}>
                      <TitleCell row={row} />
                    </TableCell>

                    <TableCell data-testid={`cell-vote-${index}`}>
                      <VoteCell row={row} />
                    </TableCell>

                    <TableCell>
                      <MediaCell
                        row={row}
                        onVideoClick={onVideoClick}
                        onImageClick={onImageClick}
                        videoDisabled={row.id === mediaState?.movieId}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <ActionCell
                        row={row}
                        isCollapsed={isCollapsed}
                        onCollapseChange={onCollapseChange}
                        onChannelClick={onChannelClick}
                        isInChannel={!!(getMovieChannels(row.id)?.length ?? 0)}
                        isEditChannel={channelMovieObject?.id === row.id}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={classes.hiddenCell} colSpan={5}>
                      <Transition in={isCollapsed} unmountOnExit>
                        <div data-testid={`cell-description-${index}`}>
                          <DescriptionCell row={row} />
                        </div>
                      </Transition>
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {!!totalCount && !!page && onPageChange && (
        <TablePagination
          count={totalCount || 0}
          page={page - 1}
          onPageChange={(_, page) => {
            onPageChange(page + 1)
            // window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
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
        <MovieChannelsModal
          open={true}
          movieObject={channelMovieObject}
          onClose={() => setChannelMovieObject(null)}
        />
      )}
    </>
  )
}

export default MoviesTable
