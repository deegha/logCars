import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../services/firebase'

export const AppContext = createContext()

const initialFilter =  {
  make: "",
  model: "",
  priceMin: "",
  priceMax: "",
  modelYeaMin: "",
  modelYearMax: "",
  transmission: "",
  fuelType: "",
}

const AppContextProvider = (props) => {
  const [ isLandingPage, setLandingPage ] = useState(true)
  const [ page, setPage ] = useState(0)
  const [filters, setFilters] = useState(initialFilter)
  const [filterItems, setFilterItems] = useState(initialFilter)
  const [searchText, setSearchText] = useState("")
  const [items, setItems] = useState([])

  const [nextPage, setNextPage] = useState("")


  return (
    <AppContext.Provider value={{ setNextPage, nextPage, isLandingPage,  setLandingPage, page, setPage, filters, setFilters, searchText, setSearchText,items, setItems, filterItems, setFilterItems }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider



