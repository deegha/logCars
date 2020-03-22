import firebase from "firebase/app"
import "firebase/firestore"

const Profile = ({query}) => {


  return (
    <div>Profile</div>
  )
}

Profile.getInitialProps = ({query}) => {

  return {query}
}


export default (Profile)
