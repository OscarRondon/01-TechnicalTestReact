import { useReducer } from 'react'
import { SortBy, type User } from '../types/user.d'

interface StateApp {
  users: User[]
  showColors: boolean
  sorting: SortBy
  filterCountry: string | null

}

  type ActionApp = { type: 'SET_USERS', payload: User[] }
  | { type: 'TOGGLE_COLORS', payload: boolean }
  | { type: 'TOGGLE_SORT_BY_COUNTRY', payload: SortBy }
  | { type: 'FILTER_BY_COUNTRY', payload: string | null }

const initialAppState: StateApp = {
  users: [],
  showColors: false,
  sorting: SortBy.NONE,
  filterCountry: null
}

function reducerApp (state: StateApp, action: ActionApp): StateApp {
  const { type } = action

  switch (type) {
    case 'SET_USERS': {
      return { ...state, users: action.payload }
    }
    case 'TOGGLE_COLORS': {
      return { ...state, showColors: action.payload }
    }
    case 'TOGGLE_SORT_BY_COUNTRY': {
      return { ...state, sorting: action.payload }
    }
    case 'FILTER_BY_COUNTRY': {
      return { ...state, filterCountry: action.payload }
    }
    default: return state
  }
}

export const useReducerApp = () => {
  const [{
    users,
    showColors,
    sorting,
    filterCountry
  }, dispatch] = useReducer(reducerApp, initialAppState)

  const setUsers = (users: User[]) => {
    dispatch({ type: 'SET_USERS', payload: users })
  }

  const setShowColors = (showColors: boolean) => {
    dispatch({ type: 'TOGGLE_COLORS', payload: showColors })
  }

  const setSorting = (sorting: SortBy) => {
    dispatch({ type: 'TOGGLE_SORT_BY_COUNTRY', payload: sorting })
  }

  const setFilterCountry = (filterCountry: string | null) => {
    dispatch({ type: 'FILTER_BY_COUNTRY', payload: filterCountry })
  }

  return {
    users,
    showColors,
    sorting,
    filterCountry,
    setUsers,
    setShowColors,
    setSorting,
    setFilterCountry
  }
}
