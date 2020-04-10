import firebase from "firebase/app"
import "firebase/firestore"
import { Header } from "../components"

const Profile = ({query}) => {


  return (
    <div>
      <Header />
    <div className={"profile"}>

      <h1>Profile Comming soon!</h1>
    </div>
    </div>
  )
}

Profile.getInitialProps = ({query}) => {

  return {query}
}


export default (Profile)
