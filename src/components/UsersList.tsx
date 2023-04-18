import { type User } from '../types/user'

export interface UsersListProps {
  users: User[]
}

export function UsersList ({ users }: UsersListProps) {
  return (
        <table width={'100%'}>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Country</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => {
                      return (
                            <tr key={user.email}>
                                <td><img src={user.picture.thumbnail} alt="user-photo"/></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button type='button'>Delete</button>
                                </td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
  )
}
