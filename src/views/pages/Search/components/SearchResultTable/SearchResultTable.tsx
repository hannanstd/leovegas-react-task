import React, { VFC } from 'react'
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

export interface SearchResultTableProps {}
const SearchResultTable: VFC<SearchResultTableProps> = () => {
  const classes = useStyles()

  const [queryParams] = useSearchParams()
  const searchValue: string = queryParams.get('search') || ''

  const query = useQuery(['searchMovie', searchValue], {
    variables: { searchText: searchValue },
    options: { enabled: !!searchValue },
  })

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>Title</TableCell>
              <TableCell>Votes</TableCell>
              <TableCell>Overview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query?.data?.items?.map?.((row) => (
              <TableRow key={row.id}>
                <TableCell width={50}>
                  <Badge
                    color="error"
                    badgeContent={row.adult ? 'Adult' : null}
                  >
                    {!!row.thumbnail ? (
                      <img
                        width={50}
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
                <TableCell width="50%">{row.overview}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SearchResultTable
