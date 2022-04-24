import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'

const usePersistSharedState = <T = any>(
  key: string,
  defaultValue?: T | (() => T)
): [T, (value: T) => void] => {
  const queryClient: QueryClient = useQueryClient()

  const { data: value } = useQuery<unknown, unknown, T>({
    queryKey: key,
    initialData: () => {
      let value: T | undefined = Storage.get(key)
      if (!value) {
        if (typeof defaultValue === 'function') {
          value = (defaultValue as Function)()
        } else {
          value = defaultValue
        }
        Storage.set(key, value)
      }
      return value
    },
    queryFn: () => Storage.get(key),
    keepPreviousData: true,
    notifyOnChangeProps: [],
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const { mutate: setValue } = useMutation<void, unknown, T>({
    mutationFn: (value: T): any => {
      Storage.set(key, value)
    },
    onMutate: (mutatedValue: T) => {
      queryClient.setQueryData(key, mutatedValue)
    },
    onError: () => {
      queryClient.setQueryData(key, value)
    },
  })

  return [value as T, setValue]
}
export default usePersistSharedState

const Storage = {
  set: (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get: (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) as string)
    } catch (e) {
      return undefined
    }
  },
}
