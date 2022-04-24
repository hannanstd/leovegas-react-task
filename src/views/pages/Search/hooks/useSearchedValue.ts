import { useSearchParams } from 'react-router-dom'

const searchQueryParamKey: string = 'q'

const useSearchedValue = (): [string, (value: string) => void] => {
  const [queryParams, setQueryParams] = useSearchParams()

  const value: string = queryParams.get(searchQueryParamKey) || ''

  const setValue = (value: string): void => {
    setQueryParams({ [searchQueryParamKey]: value.trim() })
  }

  return [value, setValue]
}

export default useSearchedValue
