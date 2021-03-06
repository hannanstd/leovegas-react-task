import React, { useEffect, useState, VFC } from 'react'
import { useQuery } from 'hooks'
import Backdrop from '@mui/material/Backdrop'
import Loading from 'views/components/Loading'
import MoviesTable from 'views/components/MoviesTable'
import useStyles from './SearchResults.styles'
import { useSearchedValue } from 'views/components/SearchInput'

const SearchResults: VFC = () => {
  const classes = useStyles()
  const [searchText] = useSearchedValue()

  const [page, setPage] = useState<number>(1)
  useEffect(() => setPage(1), [searchText])

  const { data, isLoading, isFetching } = useQuery('searchMovie', {
    variables: { searchText, page },
    options: { enabled: !!searchText, keepPreviousData: !!searchText },
  })

  return (
    <div className={classes.root}>
      <Backdrop open={isLoading || isFetching}>
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
