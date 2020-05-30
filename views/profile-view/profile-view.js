import { useState } from "react"
import { Header, Card, Footer } from "../../components"
import "./styles.scss"
import Link from "next/link"

import Lottie from 'react-lottie'
import noData from "../../static/no-data.json"

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: noData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const ProfileView = ({ items, deletefromDatabase, authUser }) => {
  const [ loading, setLoading ] = useState(false)

  const deleteItem = async (id) => {
    setLoading(true)
    await deletefromDatabase(id)
    setLoading(false)
  }

  return (
    <div>
      <Header />
      <div className="profile__wrapper">
        <div className="profile__wrapper-inner">
          <h1>Welcome! {authUser.displayName && authUser.displayName}</h1>

          {items.length > 0 && <h2>This is where you will see all the cars you add</h2>}
          {items.map( item => {
           return (
            <div key={item.id}>
              <Card item={item} />
              {loading ? (
                <div></div>
              ): (
                <div className="profile__delete-btn" onClick={()=> deleteItem(item.id)}>Delete</div>
              )}
            </div>
           )
          })}

          {!loading && items.length < 1 && (
            <div className="profile-view__no-data">
              <h2>Yo have not added any cars yet</h2>
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}/>
              <Link href={"/create"}>
                <a className="sell-car">Sell your car</a>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
