import { useState } from "react"
import { Header, Loader, Card, Footer, Player} from "../../components"
import { Filter } from "./components/filter/filter"
import "./styles.scss"

export const HomePage = ({
  filters,
  authUser,
  items,
  loading,
  nbPages,
  page,
  setPage,
  setFilterItem,
  setFilters,
  search, setSearchText }) => {

  const [showFilter, setShowFilters] = useState(false)
  const pageTitle = "Car logs"


  const renderPagination = () => {

    let pagenation = []

    for(let p = 1; p < nbPages+1 ; p++) {
      pagenation.push(<div onClick={()=> setPage(p-1)} className={`home-container__pagination-node ${page+1 === p && "home-container__pagination-node--selected"}`}>{p}</div>)
    }

    return pagenation
  }

  return (
    <div>
      <Header authUser={authUser} page={"Home"} title={`Home | ${pageTitle}`} setSearchText={setSearchText} search={search} loading={loading} />
      <div className={"home-container"} >
        <div className={`home-innerWrapper-filter ${showFilter && "home-innerWrapper-filter--show"}`}>
          <Filter filters={filters} setFilterItem={setFilterItem} setFilters={setFilters}/>
        </div>
        <div className={"home-innerWrapper"}>
          <div className="home-show-filters" onClick={() => setShowFilters(!showFilter)} >{showFilter?"Close filter":"Show filter"}</div>
          {items.map( (item, index) => {
            const track = item
            return (
              <Card key={item.url} item={track}  />
            )
          })}

          <div className="home-container__pagination-container">
            {renderPagination()}
          </div>

        </div>
      </div>
    </div>
  )
}
