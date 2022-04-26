import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import routes from 'routes'

const searchQueryParamKey: string = 'q'

const useSearchedValue = (): [string, (value: string) => void] => {
  const navigate = useNavigate()
  const [queryParams, setQueryParams] = useSearchParams()
  const { pathname } = useLocation()
  const searchPathname: string = routes.search.path

  const value: string = queryParams.get(searchQueryParamKey) || ''

  const setValue = (value: string): void => {
    if (pathname === searchPathname) {
      setQueryParams({ [searchQueryParamKey]: value.trim() })
    } else {
      navigate(`${searchPathname}?${searchQueryParamKey}=${value.trim()}`)
    }
  }

  return [value, setValue]
}

export default useSearchedValue
