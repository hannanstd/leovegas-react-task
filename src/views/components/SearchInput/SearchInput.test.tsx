import { act, fireEvent, render } from '@testing-library/react'
import SearchInput from './SearchInput'
import { BrowserRouter as Router } from 'react-router-dom'
import { useQuery } from 'hooks'
import provideTheme from '__test__/provideTheme'

jest.mock('hooks')

describe('testing SearchInput', (): void => {
  it('to be searched item in dropdown', (): void => {
    const length: number = 5
    const searchValue: string = 'Matrix'

    const items = Array.from({ length }, (_, i) => ({
      id: i,
      title: searchValue + i,
      thumbnail: 'http://test.com/image.png',
      year: 1900,
      overview:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      date: '1900-01-01',
      language: 'en',
      voteAverage: 8,
      voteCount: 150,
      popularity: 500,
      adult: true,
    }))

    ;(useQuery as jest.MockedFunction<any>).mockReturnValue({
      isLoading: false,
      data: { items },
    })

    const { getByTestId, getAllByTestId } = render(
      provideTheme(
        <Router>
          <SearchInput />
        </Router>
      )
    )

    const searchInput = getByTestId('search-input').querySelector(
      'input'
    ) as any

    act(() => {
      fireEvent.change(searchInput, { target: { value: searchValue } })
    })

    expect(getByTestId('list-container')).toBeInTheDocument()

    items.forEach((item, i) => {
      expect(getAllByTestId('list-item')[i]).toHaveTextContent(item.title)
    })
  })
})
