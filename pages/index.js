import { useEffect, useState } from "react"
import { HomePage } from "../views/home-view/home-view"
import "firebase/functions"
import { listFeeds } from "../services/backendClient"


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

const Home = ({ setAndPlay, nowPlaying, setPlaylist }) => {

  const [page, setPage] = useState(0)
  const [nbPages, setNbPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [filters, setFilters] = useState(initialFilter)

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    getItems(page)
  }, [filters, page])

  const setFilterItem = (name, item) => {
    if(name === "make")
      setFilters({
        ...filters,
        model: ""
      })

    setFilters({
      ...filters,
      [name]: item
    })
  }

  const setAllFilters = (newFilters) => { console.log(newFilters, "newFilters")
    setFilters({
      ...filters,
      ...newFilters
    })
  }

  const search = async (e) => {
    e.preventDefault()
    getItems(0)
  }

  const getItems = async(page) => {

    const data = {
      searchText,
      filters: filters,
      page
    }

    const feedResponse = await serviceCall(data)
    setPage(feedResponse.page)
    setNbPages(feedResponse.nbPages)
    setItems(feedResponse.hits)
  }


  const serviceCall = async (data) => {
    setLoading(true)
    const result = await listFeeds(data)
    setLoading(false)
    return result
  }

  const hasMore = nbPages > page+1

    return (
      <HomePage
        setFilters={setAllFilters}
        setFilterItem={setFilterItem}
        filters={filters}
        search={search}
        setSearchText={setSearchText}
        page={page}
        setPage={setPage}
        nbPages={nbPages}
        items={items}
        setAndPlay={setAndPlay}
        loading={loading && page== 0}
        nowPlaying={nowPlaying}
        loadingMore={loading && hasMore && page != 0} />
    )
}

export default Home
