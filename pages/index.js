import { useEffect, useState, useContext } from "react"
import "firebase/functions"
import { listFeeds } from "../services/backendClient"
import { HomePage } from "../views/home-view/home-view"
import { LandingPageView } from "../views/landing-page-view/landing-page-view"
import { AppContext } from "../context/app-context"

const Home = ({ setAndPlay, nowPlaying }) => {

  const [nbPages, setNbPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const { isLandingPage, setLandingPage, page, setPage,filters, setFilters, searchText, setSearchText,items, setItems } = useContext(AppContext)
  const [fetchingItems, setFetchingItems] = useState(true)

  useEffect(() => {
    getItems(page)
  }, [filters, page])

  const setFilterItem = (name, item) => {
    let change = {
      [name]: item
    }
    if(name === "make") {
      change = {
        ...change,
        model: ""
      }
    }
    setFilters({
      ...filters,
      ...change
    })

    if(isLandingPage)
      setLandingPage(false)
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
    if(isLandingPage)
      setLandingPage(false)
  }

  const getItems = async(page) => {
    setFetchingItems(true)
    const data = {
      searchText,
      filters: filters,
      page
    }

    const feedResponse = await serviceCall(data)
    setPage(feedResponse.page)
    setNbPages(feedResponse.nbPages)
    setItems(feedResponse.hits)

    setFetchingItems(false)
  }

  const serviceCall = async (data) => {
    setLoading(true)
    const result = await listFeeds(data)

    setLoading(false)
    return result
  }

  const hasMore = nbPages > page+1

  if(isLandingPage)
   return (
    <LandingPageView
      search={search}
      setSearchText={setSearchText}
      setAllFilters={setFilterItem} />
   )

  return (
    <HomePage
      fetchingItems={fetchingItems}
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
