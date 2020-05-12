import firebase from "firebase/app"
import "firebase/firestore"
import withAuth  from "../services/withAuth"
import { ProfileView } from "../views/profile-view/profile-view"
import { useEffect, useState } from "react"
import Router from "next/router"

const Profile = ({query, authUser}) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    if(authUser === false)
      Router.push("/login")
  }, [authUser])

  useEffect(() => {
    fetchFeeds()
  }, [])

  const fetchFeeds = async () => {
    const db =  firebase.firestore()
    const ref = await db.collection("feeds").where("authorId", "==", "8vPBiljvSda2PikSuCSIZyF7RIo1")
    const response = await ref.get()

    const arr = []

    response.forEach( doc => {
      if(doc.data().status === "DELETED")
        return

      arr.push({
        id: doc.id,
        ...doc.data()
      })
    })

    setItems(arr)
  }

  const deletefromDatabase = async (id) =>  {
    const db =  firebase.firestore()
    await db.collection("feeds").doc(id).set({
      status: "DELETED"
    }, {merge: true})

    fetchFeeds()
  }

  return (
    <ProfileView
      items={items}
      deletefromDatabase={deletefromDatabase}/>
  )
}

Profile.getInitialProps = ({query}) => {

  return {query}
}


export default withAuth(Profile)
