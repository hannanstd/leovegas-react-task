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
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import Backdrop from '@mui/material/Backdrop'
import ButtonGroup from '@mui/material/ButtonGroup'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import Loading from 'views/components/Loading'
import IconButton from '@mui/material/IconButton/IconButton'
import FloatingVideoPlayer from '../FloatingVideoPlayer'
import ImageSlider from '../ImageSlider'

export interface SearchResultTableProps {}

enum DetailsEnum {
  Details,
  Images,
  Videos,
}

type IdType = number | string
type DetailsState = { type: DetailsEnum | null; id: IdType | null }

const defaultDetailsState: DetailsState = { type: null, id: null }

const SearchResultTable: VFC<SearchResultTableProps> = () => {
  const classes = useStyles()
  const [queryParams] = useSearchParams()
  const searchValue: string = queryParams.get('q') || ''

  const [page, setPage] = useState<number>(1)
  useEffect(() => setPage(1), [searchValue])

  const [detailsState, setDetailsState] = useState<DetailsState>({
    ...defaultDetailsState,
  })

  const { data, isLoading } = useQuery(['searchMovie', searchValue, page], {
    variables: { searchText: searchValue, page },
    options: { enabled: !!searchValue, keepPreviousData: true },
  })

  const onVideoClick = (id: IdType): void => {
    setDetailsState({ id, type: DetailsEnum.Videos })
  }

  const onPosterClick = (id: IdType): void => {
    setDetailsState({ id, type: DetailsEnum.Images })
  }

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
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Votes</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!data?.items?.length && (
                <TableRow>
                  <TableCell colSpan={4}>No Item found</TableCell>
                </TableRow>
              )}

              {data?.items?.map?.((row) => (
                <TableRow key={row.id}>
                  <TableCell width={100}>
                    {!!row.thumbnail && (
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => onPosterClick(row.id)}
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
                        disabled={row.id === detailsState.id}
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

      {detailsState.type === DetailsEnum.Videos && !!detailsState.id && (
        <FloatingVideoPlayer
          id={detailsState.id}
          onClose={() => setDetailsState({ ...defaultDetailsState })}
        />
      )}
      {detailsState.type === DetailsEnum.Images && !!detailsState.id && (
        <ImageSlider
          id={detailsState.id}
          onClose={() => setDetailsState({ ...defaultDetailsState })}
        />
      )}
    </>
  )
}

export default SearchResultTable
