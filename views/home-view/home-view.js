import { useState, useContext } from "react"
import { Header, Loader, Card, Footer} from "../../components"
import { Filter } from "./components/filter/filter"
import "./styles.scss"
import Lottie from 'react-lottie'
import loadinganimation from "../../static/preloader.json"
import noRecords from "../../static/no-records.json"
import { AppContext } from "../../context/app-context"

import { BsFilter } from "react-icons/bs"
import { IoIosCloseCircleOutline } from "react-icons/io"




const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadinganimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const noRecordsOptions = {
  loop: true,
  autoplay: true,
  animationData: noRecords,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

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
  fetchingItems,
  searchText,
  search,
  setSearchText }) => {

  const [showFilter, setShowFilters] = useState(false)
  const { clearModel } = useContext(AppContext)
  const pageTitle = "Car logs"


  const renderPagination = () => {

    let pagenation = []

    for(let p = 1; p < nbPages+1 ; p++) {
      pagenation.push(<div key={p} onClick={()=> setPage(p-1)} className={`home-container__pagination-node ${page+1 === p && "home-container__pagination-node--selected"}`}>{p}</div>)
    }

    return pagenation
  }

  return (
    <div>
      <Header  authUser={authUser} page={"Home"} title={`Home | ${pageTitle}`} search={search} loading={loading} />
      <div className={"home-container"} >
        <div className={`home-innerWrapper-filter ${showFilter && "home-innerWrapper-filter--show"}`}>
          <Filter filters={filters} setFilterItem={setFilterItem} setFilters={setFilters} setShowFilters={setShowFilters} />

        </div>
        <div className={"home-innerWrapper"}>
          <div className="home-show-filters" >
            <div  onClick={() => setShowFilters(!showFilter)} className="home-show-filters-icon">
            <BsFilter size={"52"} color="#e84118" />
            </div>
            <a href="http://www.bestweb.lk/vote/site/carlogs_lk"><img src="https://www.bw2020.lk/vote4us.png" alt="logo" width="40" height="40"  /></a>
            {filters.make !== "" && <div className="home__filter-info"><p>You are looking at {filters.make}</p> <div onClick={()=> clearModel()} className="home-show-clear-filters-icon"><IoIosCloseCircleOutline size={"22"} color="#d63031" /> </div></div>}
          </div>

          {!fetchingItems && items.map( (item, index) => {
            const track = item
            return (
              <Card key={item.id} item={track}  />
            )
          })}

          {fetchingItems && (
           <div className={"home-loading"}>
              <Lottie
                options={defaultOptions}
                height={100}
                width={200}/>
           </div>
          )}

          {!fetchingItems && items.length < 1 && (
            <div className={"home-loading"}>
              <Lottie
                options={noRecordsOptions}
                height={100}
                width={100}/>

              <h2 className={"home-no-records"}>No records found</h2>
            </div>
          )}

          {!fetchingItems && (
             <div className="home-container__pagination-container">
             {renderPagination()}
           </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
