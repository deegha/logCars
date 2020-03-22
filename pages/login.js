import { useEffect } from "react"
import { LoginView } from "../views/login-view/login-View"
import firebase from "firebase/app"
import Router from "next/router"

import withAuth  from "../services/withAuth"

function Login({ authUser }) {
console.log(authUser)
  useEffect(() => {
    if(authUser !== false && authUser !== "loading")
      Router.push("/")
  }, [authUser])

  const handleSubmit = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  };

  return (
   <LoginView handleSubmit={handleSubmit} />
  );
}

export default withAuth(Login)
