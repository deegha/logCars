import "firebase/firestore"
import { Header } from "../components"

const Song = ({query}) => {


  return (
    <div>
      <Header />
    <div className={"profile"}>

      <h1>Song page Comming soon!</h1>
    </div>
    </div>
  )
}

Song.getInitialProps = ({query}) => {

  return {query}
}


export default (Song)
