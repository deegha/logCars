import firebase  from "firebase"
import { FeedView } from "../views/Feed-view/Feed-view"

const Feed = ({ feed }) => {
  return (
    <FeedView vehicle={feed} />
  )
}

Feed.getInitialProps = async ({query}) => {

  const db =  firebase.firestore()
  const ref = await db.collection("feeds").doc(query.vehicle)
  const response = await ref.get()
  return { feed: response.data(), id: query.vehicle }
}

export default Feed
