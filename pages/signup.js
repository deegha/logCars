import { useEffect } from "react"
import withAuth from "../services/withAuth"
import firebase from "firebase/app"
import Router from "next/router"
import { uploadImage } from "../services/helper"

import { CreateProfileView } from "../views/create-profile-view/create-profile-view"

const CreateProfile = ({authUser}) => {

  useEffect(() => {
    if(authUser !== false && authUser !== "loading")
      Router.push("/")
  }, [authUser])

  const handleSubmit = async (inputs) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password);

      const image = await uploadImage(inputs.image.file)

      var user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: inputs.displayName,
          photoURL: image
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <CreateProfileView handleSubmit={handleSubmit} />
  )
}


export default withAuth(CreateProfile)
