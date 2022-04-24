import React, { VFC } from 'react'
import { HeaderPortalConsumer } from 'views/layout/components/Header'
import SearchInput from './components/SearchInput'
import SearchResults from './components/SearchResults'

export interface SearchProps {}

const Search: VFC<SearchProps> = () => {
  return (
    <div>
      <HeaderPortalConsumer>
        <SearchInput />
      </HeaderPortalConsumer>
      <SearchResults />
    </div>
  )
}

export default Search
