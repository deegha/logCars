import React, { useState,useContext } from "react"
import Link from "next/link"
import css from "./styles.scss"
import logout from "../../services/logOut"
import Head  from "../head/head"
import withAuth from "../../services/withAuth"
import searchicon from "../../static/search.png"
import { APP_LOG } from "../../config/config"
import { AppContext } from "../../context/app-context"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
}

const Header = ({ authUser, title, description, keywords, url, ogImage, search, loading }) => {

  const [mobileMenu, toggleMobileMenu] = useState(false)
  const { isLandingPage, setLandingPage, page, setPage,filters, setFilters, searchText, setSearchText,items, setItems } = useContext(AppContext)

  const onClick = () => {
    logout()
  }

  const openMobileMenu = () => {
    toggleMobileMenu(!mobileMenu)
  }


  return (
    <div className={"header-container"}>
      <Head
        keywords={keywords}
        ogImage={ogImage}
        url={url}
        description={description}
        title={title} />

      <div className={"header-sitelogo"}>
        <Link href={"/"}>
          <a className="text-xs">
            <span className={"header-siteimage"}>
              <img alt="carlogs" src={APP_LOG} />
            </span>
            {/* <span className={"site-name"}>
                Mellow Music
            </span> */}
          </a>
        </Link>
      </div>
      <div className={`${!search ? "header-search-area--hide": "header-search-area"}`}>

        <form onSubmit={search}>
        <div className={"header-search-form-item"}>
          <div className={"search-loading__wrapper"}>
            { loading && <div className={"search-loading"} /> }
          </div>

          <input

            autoComplete="off"
            className={"header-search-box"}
            type="text"
            id="searchText"
            name="searchText"
            value={searchText}
            placeholder="Search your vehicle "
            onChange={(e) => setSearchText(e.target.value)}
          />
          <img src={searchicon} onClick={search} className={"header-search-icon"}/>
          </div>
        </form>


      </div>
      <div className={`header-navigation ${mobileMenu && "heade_mobile-menu"}`}>
        <ul>
          <li>
            <Link href={"/create"}>
              <a className="sell-car">Sell your car</a>
            </Link>
          </li>
          <li>
            <Link href={"/terms"}>
              <a className="text-xs">Terms & Conditions</a>
            </Link>
          </li>
          {authUser && (
              <li onClick={onClick}>
                <a>Log out</a>
              </li>
          )}
          <li>
            {authUser? (
                <Link href={"/profile"}>
                <a>
              <div className={"header-user"}>

                <p>Hey {authUser.displayName}!</p>
                <div className={"header-userImage"}>
                  {authUser.photoURL && (<div className={"img"} style={{backgroundImage: `url(${authUser.photoURL})`}} />)}
                </div>

              </div>
              </a>
                </Link>
            ):(
              <Link href={"/login"}>
              <a className="text-xs">Login</a>
            </Link>
            )}

          </li>
        </ul>
      </div>
      <div className={"header-mobile-navigation"} onClick={openMobileMenu}>
        <div className={"header-mobile-navigation-dot"} />
        <div className={"header-mobile-navigation-dot"} />
        <div className={"header-mobile-navigation-dot"} />
      </div>
    </div>
  );
};

export default withAuth(Header)
