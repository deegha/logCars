import { useRef, useEffect } from "react"
import searchicon from "../../static/search.png"
import bg from "../../static/car-side-mirror.png"

import "./styles.scss"

import honda from "../../static/honda.png"
import toyota from "../../static/toyota.png"
import bmw from "../../static/bmw.png"
import nissan from "../../static/nissan.png"
import mitsubishi from "../../static/mitsubishi.png"

export const LandingPageView = ({setSearchText, search, setAllFilters}) => {
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  }, [])

  return (
    <div className="landing-page" style={{backgroundImage: `url(https://res.cloudinary.com/duqpgdc9v/image/upload/q_auto/v1587833228/logcars/car-side-mirror.png)`}}>
      <div className="landing-page__heading">
        <h1>carlogs.lk</h1>
        {/* <h2>Search your dream car</h2> */}
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

    </div>
  )
}
