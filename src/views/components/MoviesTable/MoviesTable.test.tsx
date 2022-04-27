import { render, RenderResult } from '@testing-library/react'
import MoviesTable from './MoviesTable'
import { provideTheme, randomNumber, randomString } from '__test__'
import { MovieObjectType } from 'types/Movies.types'

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  usePersistSharedState: () => [[], () => {}],
  useQuery: () => ({ isLoading: false }),
}))

const perPage: number = randomNumber(10)
const totalCount: number = randomNumber(120)
const page: number = randomNumber(Math.ceil(totalCount / perPage))
const pageItemCount: number = Math.min(
  perPage,
  totalCount - (page - 1) * perPage
)
const onPageChange: jest.Mock<any, any> = jest.fn()

const rows: MovieObjectType[] = Array.from(
  { length: pageItemCount },
  (_, i) => ({
    id: i + 1,
    title: randomString(),
    thumbnail: 'http://test.com/image.png',
    year: 1900 + i,
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '1900-01-01',
    language: 'en',
    voteAverage: 8,
    voteCount: 150,
    popularity: 500,
    adult: true,
  })
)

let documentBody: RenderResult
describe('testing MoviesTable', (): void => {
  beforeEach(() => {
    documentBody = render(
      provideTheme(
        <MoviesTable
          rows={rows}
          page={page}
          perPage={perPage}
          totalCount={totalCount}
          onPageChange={onPageChange}
        />
      )
    )
  })

  it('to have exact row number', (): void => {
    const { getAllByTestId } = documentBody
    expect(getAllByTestId('table-row')).toHaveLength(pageItemCount)
  })

  it('to have thumbnail', (): void => {
    const { getByTestId } = documentBody
    for (let i = 0; i < pageItemCount; i++) {
      expect(
        getByTestId(`cell-thumbnail-${i}`).querySelector('img')
      ).toHaveAttribute('src', rows[i].thumbnail)
    }
  })

  it('to have title', (): void => {
    const { getByTestId } = documentBody
    for (let i = 0; i < pageItemCount; i++) {
      expect(getByTestId(`cell-title-${i}`)).toHaveTextContent(rows[i].title)
    }
  })

  it('to have vote', (): void => {
    const { getByTestId } = documentBody
    for (let i = 0; i < pageItemCount; i++) {
      expect(getByTestId(`cell-vote-${i}`)).toHaveTextContent(
        `${rows[i].voteAverage}/10`
      )

      expect(getByTestId(`cell-vote-${i}`)).toHaveTextContent(
        `${rows[i].voteCount} votes`
      )

      expect(getByTestId(`cell-vote-${i}`)).toHaveTextContent(
        `Popularity: ${rows[i].popularity}`
      )
    }
  })
})
