import {
  UseMutationOptions,
  UseQueryOptions,
} from 'react-query/types/react/types'
import { QuerySchemas } from 'schema/query.schema'
import { MutationSchemas } from 'schema/mutation.schema'

export type HeadersType = Record<string, string>
export type RequestType = {
  endpoint: string
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
  headers?: HeadersType
  body?: Record<string, any>
  queryParams?: Record<string, any>
}

/*Query Types*/
export type { QuerySchemas }
export type QueryOptions = Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
export type QueryKeys = keyof QuerySchemas
export type QueryRequests = {
  [K in QueryKeys]: (input: QuerySchemas[K]['input']) => RequestType & {
    resolver: (data: any) => QuerySchemas[K]['output']
  }
}
export interface UseQueryArgs<T extends QueryKeys> {
  options?: QueryOptions
  variables: QuerySchemas[T]['input']
  headers?: HeadersType
}

/*Mutation Types*/
export type { MutationSchemas }
export type MutationOptions = Omit<
  UseMutationOptions,
  'mutationKey' | 'mutationFn'
>
export type MutationKeys = keyof MutationSchemas
export type MutationRequests = {
  [K in MutationKeys]: (input: MutationSchemas[K]['input']) => RequestType & {
    resolver: (data: any) => MutationSchemas[K]['output']
  }
}
export interface UseMutationArgs<T extends MutationKeys> {
  options?: MutationOptions
  headers?: HeadersType
}
