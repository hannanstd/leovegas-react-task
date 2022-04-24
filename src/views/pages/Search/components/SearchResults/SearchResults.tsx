import React, { useEffect, useState, VFC } from 'react'
import { useQuery } from 'hooks'
import Backdrop from '@mui/material/Backdrop'
import Loading from 'views/components/Loading'
import MoviesTable from 'views/components/MoviesTable'
import useStyles from './SearchResults.styles'
import useSearchedValue from '../../hooks'

export interface SearchResultsProps {}

const SearchResults: VFC<SearchResultsProps> = () => {
  const classes = useStyles()
  const [searchText] = useSearchedValue()

  const [page, setPage] = useState<number>(1)
  useEffect(() => setPage(1), [searchText])

  const { data, isLoading } = useQuery('searchMovie', {
    variables: { searchText, page },
    options: { enabled: !!searchText, keepPreviousData: true },
  })

  return (
    <div className={classes.root}>
      <Backdrop open={isLoading}>
        <Loading />
      </Backdrop>
      <MoviesTable
        rows={data?.items ?? ([] as any)}
        page={page}
        onPageChange={setPage}
        totalCount={data?.meta?.totalCount}
      />
    </div>
  )
}

export default SearchResults
