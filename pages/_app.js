
// import App from 'next/app'
import { useState } from "react"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss'
import "../sharedStyles/styles.scss"

const Header = ({ title, image }) => {
  return (
    <div className={"player-header"}>
      <img src={image} />
      {title}
    </div>
  )
}


function MyApp({ Component, pageProps }) {
  const [nowPlaying, setNowPlaying] = useState({
    url: "",
    id: "",
    title: "",
    image: ""
  })

  const setAndPlay = (track) => {
    setNowPlaying(track)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Component {...pageProps} setAndPlay={setAndPlay} nowPlaying={nowPlaying} />
      {nowPlaying.url !== "" && (
         <div className={"player"}>
          <AudioPlayer
            layout={"horizontal-reverse"}
            header={<Header title={nowPlaying.title} image={nowPlaying.image} />}
            src={nowPlaying.url} autoPlay />
        </div>
      )}
    </div>
  )
}

export default MyApp
