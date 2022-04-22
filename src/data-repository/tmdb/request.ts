import { RequestType } from 'types/ApiTypes'

const request = async ({
  endpoint,
  method = 'GET',
  headers = {},
  queryParams = {},
  body,
}: RequestType) => {
  const baseUrl: string = `${process.env.REACT_APP_TMDB_API_URL}`
  const apiKey: string = `${process.env.REACT_APP_TMDB_API_KEY}`

  const url: string =
    baseUrl.replace(/\/$/g, '') + '/' + endpoint.replace(/^\//g, '')
  queryParams = Object.assign(queryParams || {}, { api_key: apiKey })

  const response: Response = await fetch(
    url + '?' + new URLSearchParams(queryParams).toString(),
    {
      cache: 'no-cache',
      method: method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined,
    }
  )

  return response.ok ? response.json() : Promise.reject(response.statusText)
}
export default request
