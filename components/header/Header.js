import React, { useState } from "react"
import Link from "next/link"
import css from "./styles.scss"
import logout from "../../services/logOut"
import Head  from "../head/head"
import withAuth from "../../services/withAuth"

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
}

const Header = ({ authUser, page, title, description, keywords, url, ogImage }) => {

  const onClick = () => {
    logout()
  }

  return (
    <div className={"header-container"}>
      <Head
        ogImage={ogImage}
        url={url}
        description={description}
        title={title} />

      <div className={"header-sitelogo"}>
        <Link href={"/"}>
          <a className="text-xs">
            <span className={"header-siteimage"}>
              <img src={"https://res.cloudinary.com/duqpgdc9v/image/upload/w_100/v1584875973/mellowMusic/mellowmusic-bg.png"} />
            </span>
          Mellow Music </a>
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
            <Link href={"/terms"}>
              <a className="text-xs">Terms & Conditions</a>
            </Link>
          </li>
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
                  {authUser.photoURL && (<div className={"img"} style={{backgroundImage: `url(${authUser.photoURL.insert(50, "w_100,h_100,c_fill/")})`}} />)}
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
