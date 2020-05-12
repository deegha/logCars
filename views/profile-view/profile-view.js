import { useState } from "react"
import { Header, Card } from "../../components"
import "./styles.scss"

export const ProfileView = ({ items, deletefromDatabase }) => {
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
          <h1>Welocome!</h1>
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
        </div>
      </div>
    </div>
  )
}
