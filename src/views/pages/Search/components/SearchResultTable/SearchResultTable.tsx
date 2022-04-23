import React, { useEffect, useState, VFC } from 'react'
import { useQuery } from 'hooks'
import useStyles from './SearchResultTable.styles'
import { useSearchParams } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Badge from '@mui/material/Badge'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import Backdrop from '@mui/material/Backdrop'
import ButtonGroup from '@mui/material/ButtonGroup'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import Loading from 'views/components/Loading'
import IconButton from '@mui/material/IconButton/IconButton'
import FloatingVideoPlayer from '../FloatingVideoPlayer'

export interface SearchResultTableProps {}
const SearchResultTable: VFC<SearchResultTableProps> = () => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(1)
  const [videoMovieId, setVideoMovieId] = useState<number | string | null>(null)

  const [queryParams] = useSearchParams()
  const searchValue: string = queryParams.get('search') || ''

  useEffect(() => setPage(1), [searchValue])

  const { data, isLoading } = useQuery(['searchMovie', searchValue, page], {
    variables: { searchText: searchValue, page },
    options: { enabled: !!searchValue, keepPreviousData: true },
  })

  return (
    <>
      <div className={classes.root}>
        <Backdrop open={isLoading}>
          <Loading />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Title</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!data?.items?.length && (
                <TableRow>
                  <TableCell colSpan={6}>No Item found</TableCell>
                </TableRow>
              )}

              {data?.items?.map?.((row) => (
                <TableRow key={row.id}>
                  <TableCell width={100}>
                    <Badge
                      color="error"
                      badgeContent={row.adult ? 'Adult' : null}
                    >
                      {!!row.thumbnail ? (
                        <img
                          width={100}
                          src={row.thumbnail}
                          alt={row.title}
                          title={row.title}
                        />
                      ) : (
                        <div style={{ display: 'block', width: 25 }} />
                      )}
                    </Badge>
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
                        onClick={() =>
                          setVideoMovieId((videoMovieId) =>
                            videoMovieId === row.id ? null : row.id
                          )
                        }
                      >
                        <OndemandVideoIcon />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!!data?.meta?.totalCount && (
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={data?.meta?.totalCount || 0}
            rowsPerPage={20}
            page={page - 1}
            onPageChange={(_, page) => setPage(page + 1)}
          />
        )}
      </div>
      {videoMovieId && (
        <FloatingVideoPlayer
          id={videoMovieId}
          onClose={() => setVideoMovieId(null)}
        />
      )}
    </>
  )
}

export default SearchResultTable
