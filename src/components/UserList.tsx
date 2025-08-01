import React, { useState, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

interface UserListProps {
  onUserSelect?: (user: User) => void
  apiEndpoint?: string
}

export const UserList: React.FC<UserListProps> = ({
  onUserSelect,
  apiEndpoint = '/api/users',
}) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiEndpoint)
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiEndpoint])

  if (loading) return <div data-testid="loading">Loading...</div>
  if (error) return <div data-testid="error">Error: {error}</div>

  return (
    <div data-testid="user-list">
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button
              onClick={() => onUserSelect?.(user)}
              data-testid={`user-${user.id}`}
            >
              {user.name} ({user.email})
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
