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
import { MovieIdType, MovieObjectType } from './MoviesTable.types'
import useStyles from './MoviesTable.styles'
import MovieChannels, {
  useMovieChannelsHelpers,
} from './components/MovieChannels'
import MovieMedia, {
  MovieMediaEnum,
  MovieMediaProps,
} from './components/MovieMedia'
import ActionCell from './components/TableCells/ActionCell'
import DescriptionCell from './components/TableCells/DescriptionCell'
import ThumbnailCell from './components/TableCells/ThumbnailCell'
import TitleCell from './components/TableCells/TitleCell'
import VideoCell from './components/TableCells/VideoCell'
import VoteCell from './components/TableCells/VoteCell'

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

  const onThumbnailClick = (movieId: MovieIdType): void =>
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
              <TableCell>Videos</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!rows?.length && (
              <TableRow>
                <TableCell colSpan={5}>No Item found</TableCell>
              </TableRow>
            )}

            {rows?.map?.((row) => {
              const isCollapsed: boolean = collapsedIds.includes(row.id)
              return (
                <Fragment key={row.id}>
                  <TableRow className={classes.tableRow}>
                    <TableCell align="center" className={classes.thumbnailCell}>
                      <ThumbnailCell row={row} onClick={onThumbnailClick} />
                    </TableCell>

                    <TableCell>
                      <TitleCell row={row} />
                    </TableCell>

                    <TableCell>
                      <VoteCell row={row} />
                    </TableCell>

                    <TableCell>
                      <VideoCell
                        row={row}
                        onClick={onVideoClick}
                        disabled={row.id === mediaState?.movieId}
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
                        <div>
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
