import { useEffect, useContext } from "react"
import authUser from "../services/withAuth"
import Router from "next/router"
import "firebase/firestore"
import fb from "firebase/app"
import { firebase  } from "../services/firebase"
import { uploadImage, makeid } from "../services/helper"
import moment from 'moment'
import { CreateView } from "../views/create-view/create-view"
import { useAlert, types } from 'react-alert'
import { AppContext } from "../context/app-context"

const Create = ({authUser}) => {
  const alert = useAlert()
  const { setLandingPage } = useContext(AppContext)

  useEffect(() => {
    if(authUser === false)
      Router.push("/login")
  }, [authUser])


  const creatFeed = async (data) => {

    try {
      alert.show("Uploading images...", {
        timeout: 2000,
        type: types.INFO,
      })

      data.images = await Promise.all(data.images.map( async(image) =>  ({
        url: await uploadImage(image.file)
      })))

      alert.show("Creating the add... ", {
        timeout: 2000,
        type: types.INFO,
      })

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

      setLandingPage(false)
      const db =  firebase.firestore()
      await db.collection("feeds").add(feed)

      alert.show("Your add is sucessfully created ", {
        timeout: 2000,
        type: types.SUCCESS,
      })

      Router.push("/")
    }catch(err) {
      console.log("error while creating", err)
      throw new Error("Error while creating add", err)
    }
  }

  return (
    <CreateView creatFeed={creatFeed} />
  )
}


export default authUser(Create)





