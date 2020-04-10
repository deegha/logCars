
import "./styles.scss"
import firebase from "firebase/app"

export const Google = () => {

  const login = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(({ user }) => {
      console.log(user, "user")
    })
    .catch(err => {
      console.log(err, 'at google button')
    })
  }

  return (
    <div className={"google-container"} onClick={login}> Continue with google</div>
  )
}
