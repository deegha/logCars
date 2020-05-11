import { useRef, useEffect, useContext } from "react"
import searchicon from "../../static/search.png"
import Router from "next/router"
import { AppContext } from "../../context/app-context"
import Head  from "../../components/head/head"
import { APP_LOG, APP_BASE_URL, APP_DESCRIPTION } from "../../config/config"
import { useAlert, types } from 'react-alert'

import "./styles.scss"

import honda from "../../static/honda.png"
import toyota from "../../static/toyota.png"
import bmw from "../../static/bmw.png"
import nissan from "../../static/nissan.png"
import mitsubishi from "../../static/mitsubishi.png"

export const LandingPageView = ({setSearchText, search, setAllFilters}) => {
  const inputEl = useRef(null)
  const { setNextPage } = useContext(AppContext)

  const alert = useAlert()

  useEffect(() => {
    inputEl.current.focus()

    alert.show("Hey there! thank you for joining us with the Beta test.", {
      timeout: 9000,
      type: types.INFO,
    })
  }, [])

  const navigateToLogin = () => {
    setNextPage("create")
    Router.push("/create")
  }

  return (
    <div className="landing-page" style={{backgroundImage: `url(https://res.cloudinary.com/duqpgdc9v/image/upload/q_auto/v1587833228/logcars/car-side-mirror.png)`}}>
      <Head
        keywords={"cars, buying and selling, search, search cars"}
        ogImage={"https://res.cloudinary.com/duqpgdc9v/image/upload/v1587913120/logcars/app_image.png"}
        url={APP_BASE_URL}
        description={APP_DESCRIPTION}
        title={"Carlogs.lk | find your dream car"} />

      <div className="landing-page__heading">
        <h1>carlogs.lk</h1>
      </div>

      <div className="landing-page__search-area">
        <form  onSubmit={search}>
          <div className="landing-page__search-form">
          <div className="landing-page__form-item">
            <div className="landing-page__search-box">
              <img src={searchicon} />
              <input type="text"  placeholder="Search for your dream car" ref={inputEl} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            <button type="submit" className="landing-page__search-button">Search</button>
          </div>
          <div className="landing-page__form-item landing-page__form-item--category">
            <img src={honda} onClick={() => setAllFilters("make", "honda")} className="landing-page__car-cat" />
            <img src={toyota} onClick={() => setAllFilters("make", "toyota")} className="landing-page__car-cat"  />
            <img src={bmw} onClick={() => setAllFilters("make", "BMW")} className="landing-page__car-cat"  />
            <img src={nissan}  onClick={() => setAllFilters("make", "Nissan")} className="landing-page__car-cat" />
            <img src={mitsubishi}  onClick={() => setAllFilters("make", "Mitsubishi")} className="landing-page__car-cat" />
          </div>
          </div>


        </form>
      </div>

        <div className="landing-page__sell-btn" onClick={navigateToLogin} >
          <h2>Sell your car for free</h2>
      </div>

    </div>
  )
}
