import { useEffect, useMemo, useState } from 'react'
import axios, { AxiosError } from 'axios'

interface IStore {
  [key: string]: any
}

const store: IStore = {}

type TOptionsObject = {
  url: string
  params?: object
  initialData?: any
}

type TOptions = TOptionsObject | string

export default function useRequest<T> (options: TOptions) {
  const { url, params, initialData } = useMemo<TOptionsObject>(() => {
    return typeof options === 'string' ? { url: options } : options
  }, [options])

  const hashKey = useMemo<string>(() => {
    return JSON.stringify({ url, params })
  }, [url, params])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<T>(initialData)
  const [hasError, setHasError] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError>()

  function fetch () {
    setIsLoading(true)
    axios<T>(url, { params })
      .then(({ data }) => {
        setData(data)
        store[hashKey] = data
      })
      .catch(error => {
        setHasError(true)
        setError(error)
      })
      .finally(() => setIsLoading(false))
  }

  function refetch () {
    fetch()
  }

  useEffect(() => {
    store[hashKey] ? setData(store[hashKey]) : fetch()
  }, [])

  return {
    data,
    isLoading,
    hasError,
    error,
    refetch
  }
}
