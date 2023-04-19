import { useEffect, useRef, useState, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types/user.d'
import { UsersList } from './components/UsersList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => { setShowColors(!showColors) }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDeleteUser = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => { setUsers(originalUsers.current) }

  const handleChangeSort = (sortby: SortBy) => {
    setSorting(sortby)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=3&results=10')
      .then(async apiResult => await apiResult.json())
      .then(jsonResult => {
        setUsers(jsonResult.results)
        originalUsers.current = jsonResult.results
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLocaleLowerCase().includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    switch (sorting) {
      case SortBy.NONE:{
        return filteredUsers
      }
      case SortBy.NAME:{
        return filteredUsers.toSorted((a, b) => {
          return a.name.first.localeCompare(b.name.first)
        })
      }
      case SortBy.LAST_NAME:{
        return filteredUsers.toSorted((a, b) => {
          return a.name.last.localeCompare(b.name.last)
        })
      }
      case SortBy.COUNTRY:{
        return filteredUsers.toSorted((a, b) => {
          return a.location.country.localeCompare(b.location.country)
        })
      }
      default: {
        return filteredUsers
      }
    }
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>React Technical Test </h1>
      <header>
        <button onClick={toggleColors}>Toggle colors</button>
        <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'Unsort by country' : 'Sort by country'}</button>
        <button onClick={handleReset}>Reset State</button>
        <input placeholder='Filter by Country' onChange={(e) => { setFilterCountry(e.target.value) }} autoComplete='false' />
      </header>
      <UsersList
        users={sortedUsers}
        showColors={showColors}
        deleteUser={handleDeleteUser}
        chageSorting={handleChangeSort}
      />
    </>
  )
}

export default App
