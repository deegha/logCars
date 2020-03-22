import { useEffect } from "react"
import authUser from "../services/withAuth"
import Router from "next/router"
import 'firebase/storage'
import "firebase/firestore"
import fb from "firebase/app"
import { firebase  } from "../services/firebase"
import { uploadImage } from "../services/helper"

import { UploadMusicView } from "../views/upload-music-view/upload-music-view"

const UploadMusic = ({authUser}) => {

  useEffect(() => {
    if(authUser === false)
      Router.push("/login")
  }, [authUser])


  const upload = async (data) => {
    const audioName = data.input.title+"-"+authUser.displayName
    const storageRef = fb.storage().ref(`audio/${audioName.replace(/\s/g, '_')}`);
    await storageRef.put(data.songFile.file)
    const audioUrl = await storageRef.getDownloadURL()
    const image = await uploadImage(data.imageFile.file)

    const track = {
      createdAt: new Date(),
      author: authUser,
      title: data.input.title,
      genre: data.input.genre,
      description: data.input.description,
      image,
      url: audioUrl,
      upVote: 1,
      downVote: 0
    }

    const db =  firebase.firestore()
    await db.collection("tracks").add(track)
  }

  return (
    <UploadMusicView upload={upload } />
  )
}

export default authUser(UploadMusic)

