import { SortBy, type User } from '../types/user.d'

export interface UsersListProps {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  chageSorting: (sortby: SortBy) => void
}

export function UsersList ({ users, showColors, deleteUser, chageSorting }: UsersListProps) {
  return (
        <table width={'100%'}>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th onClick={() => { chageSorting(SortBy.NAME) } }>Name</th>
                    <th onClick={() => { chageSorting(SortBy.LAST_NAME) } }>Last Name</th>
                    <th onClick={() => { chageSorting(SortBy.COUNTRY) } }>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                      const bgColor = index % 2 === 0 ? '#333' : '555'
                      const color = showColors ? bgColor : 'transparent'
                      return (
                            <tr key={user.email} style={{ background: color }}>
                                <td><img src={user.picture.thumbnail} alt="user-photo"/></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button type='button' onClick={() => { deleteUser(user.email) }}>Delete</button>
                                </td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
  )
}
