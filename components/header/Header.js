import React, { useState } from "react"
import Link from "next/link"
import css from "./styles.scss"
import logout from "../../services/logOut"

import withAuth from "../../services/withAuth"

const Header = ({ authUser, page }) => {
  const [ openMenu, setOpenMenu ] = useState(false)

  const onClick = () => {
    logout()
  }

  return (
    <div className={"header-container"}>
      <div className={"header-sitelogo"}>
        <Link href={"/"}>
          <a className="text-xs"> Mellow Music </a>
        </Link>
      </div>

      <div className={"header-navigation"}>
        <ul>
          {authUser && (
              <li onClick={onClick}>
                <a>Log out</a>
              </li>
          )}
          <li>
            <Link href={"/upload-music"}>
              <a className="text-xs">Upload music</a>
            </Link>
          </li>
          <li>
            {authUser? (
              <div className={"header-user"}>
                <p>Hey {authUser.displayName}!</p>
                <div className={"header-userImage"}>
                  <div className={"img"} style={{backgroundImage: `url(${authUser.photoURL})`}} />
                </div>

              </div>
            ):(
              <Link href={"/login"}>
              <a className="text-xs">Login</a>
            </Link>
            )}

          </li>
        </ul>
      </div>

    </div>
  );
};

export default withAuth(Header)
