import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types/user.d'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=100')
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
      {
       JSON.stringify(users)
      }
    </>
  )
}

export default App
