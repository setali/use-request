import useRequest from './useRequest'

type TUser = {
  id: number
  name: string
}

export default function Sample () {
  const {
    isLoading,
    data: users,
    hasError,
    error,
    refetch
  } = useRequest<TUser[]>({
    url: 'https://jsonplaceholder.typicode.com/users',
    initialData: [],
    params: { a: 2 }
  })

  const { data: user } = useRequest<TUser>(
    'https://jsonplaceholder.typicode.com/users/1'
  )

  if (isLoading) {
    return 'Loading'
  }

  if (hasError) {
    return <div>{error?.message}</div>
  }

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <ol>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>
      <h3>{user?.name}</h3>
    </div>
  )
}
