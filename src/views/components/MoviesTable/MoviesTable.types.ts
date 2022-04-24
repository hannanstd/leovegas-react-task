import { QuerySchemas } from 'schema/query.schema'

export type MovieObjectType = QuerySchemas['searchMovie']['output']['items'][0]
export type MovieIdType = string | number
