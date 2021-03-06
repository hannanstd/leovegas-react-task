import { mutations, queries, request } from 'data-repository'
import {
  useMutation as useReactMutation,
  useQuery as useReactQuery,
} from 'react-query'
import {
  MutationKeys,
  MutationSchemas,
  QueryKeys,
  QuerySchemas,
  UseMutationArgs,
  UseQueryArgs,
} from 'types/ApiTypes'

const useQuery = <T extends QueryKeys>(
  key: T | [T, ...any[]],
  { options, variables, headers }: UseQueryArgs<T> = {} as any,
  _options?: UseQueryArgs<T>['options']
) => {
  if (!Array.isArray(key)) key = [key, variables]
  return useReactQuery<unknown, unknown, QuerySchemas[T]['output']>(
    key,
    async () => {
      const { resolver, ...args } = queries?.[key[0] as T](variables as any)
      return resolver(
        await request({
          ...args,
          headers: { ...(headers || {}), ...(args?.headers || {}) },
        })
      )
    },
    { ...(options || {}), ...(_options || {}) } as any
  )
}

const useMutation = <T extends MutationKeys>(
  key: T,
  { options, headers }: UseMutationArgs<T> = {} as any,
  _options?: UseMutationArgs<T>['options']
) => {
  return useReactMutation<
    MutationSchemas[T]['output'],
    unknown,
    MutationSchemas[T]['input']
  >(
    key,
    async (variables) => {
      const { resolver, ...args } = mutations?.[key](variables as any)
      return resolver(
        await request({
          ...args,
          headers: { ...(headers || {}), ...(args?.headers || {}) },
        })
      )
    },
    { ...(options || {}), ...(_options || {}) } as any
  )
}

export { useQuery, useMutation }
