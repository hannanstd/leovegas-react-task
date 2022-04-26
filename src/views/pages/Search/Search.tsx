import React, { VFC } from 'react'
import { HeaderPortalConsumer } from 'views/layout/components/Header'
import SearchInput from 'views/components/SearchInput'
import SearchResults from './components/SearchResults'

const Search: VFC = () => {
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
