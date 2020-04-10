import { useEffect } from "react"
import authUser from "../services/withAuth"
import Router from "next/router"
import "firebase/firestore"
import fb from "firebase/app"
import { firebase  } from "../services/firebase"
import { uploadImage, makeid } from "../services/helper"
import moment from 'moment'
import { CreateView } from "../views/create-view/create-view"

const Create = ({authUser}) => {

  useEffect(() => {
    if(authUser === false)
      Router.push("/login")
  }, [authUser])

  const creatFeed = async (data) => {
    console.log(authUser)

    data.images = await Promise.all(data.images.map( async(image) =>  ({
      url: await uploadImage(image.file)
    })))

    const feed = {
      ...data,
      createdAt: new Date(),
      timeStamp: moment().unix(),
      status: "ACTIVE",
      author: {
        displayName: authUser.displayName,
        email: authUser.email,
        id: authUser.uid
      }
    }

    const db =  firebase.firestore()
    await db.collection("feeds").add(feed)
  }

  return (
    <CreateView creatFeed={creatFeed} />
  )
}


export default authUser(Create)





