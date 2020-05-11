import { useEffect, useContext } from "react"
import { LoginView } from "../views/login-view/login-View"
import firebase from "firebase/app"
import Router from "next/router"
import { AppContext } from "../context/app-context"

import withAuth from "../services/withAuth"

function Login({ authUser }) {
  const { nextPage } = useContext(AppContext)

  useEffect(() => {
    if (authUser !== false && authUser !== "loading") {
      if (nextPage !== "")
        Router.push(`/${nextPage}`)

      else
        Router.push("/")
    }


  }, [authUser])

  const handleSubmit = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  };

  return (
    <LoginView handleSubmit={handleSubmit} />
  );
}

export default withAuth(Login)
