import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types/user.d'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=10')
      .then(async apiResult => await apiResult.json())
      .then(jsonResult => {
        console.log(jsonResult)
        setUsers(jsonResult.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h1>React Technical Test </h1>
      <UsersList users={users} />
    </>
  )
}

export default App
