import React, { VFC } from 'react'
import { HeaderPortal } from 'views/layout/components/Header'
import SearchInput from './components/SearchInput'
import SearchResultTable from './components/SearchResultTable'
import useStyles from './Search.styles'

export interface SearchProps {}

const Search: VFC<SearchProps> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HeaderPortal>
        <div className={classes.searchInputContainer}>
          <SearchInput />
        </div>
      </HeaderPortal>
      <div className={classes.resultContainer}>
        <SearchResultTable />
      </div>
    </div>
  )
}

export default Search
