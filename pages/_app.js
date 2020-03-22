
// import App from 'next/app'
import { useState, useEffect } from "react"
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/src/styles.scss'
import "../sharedStyles/styles.scss"
import { initGA, logPageView } from '../uitls/analatics'

const Header = ({ title, image }) => {
  return (
    <div className={"player-header"}>
      <img src={image} />
      {title}
    </div>
  )
}

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if(process.env.NODE_ENV !== "development") {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }
  })

  const [playlist, setPlaylist] = useState([])
  const [nowPlaying, setNowPlaying] = useState({
    url: "",
    id: "",
    title: "",
    image: ""
  })

  const setAndPlay =  (track) => {
     setNowPlaying(track)
  }

  const nextSong = () => {
    const nowPlayingIndex = playlist.findIndex(track => track.url === nowPlaying.url)
    console.log(nowPlayingIndex, playlist.length)
    if(nowPlayingIndex === playlist.length-1) {
      setNowPlaying(playlist[0])
    }else {
      setNowPlaying(playlist[nowPlayingIndex+1])
    }
  }

  const setList = (list) => {
    setPlaylist(list)
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Component {...pageProps} setAndPlay={setAndPlay} nowPlaying={nowPlaying} setPlaylist={(setList)} />
      {nowPlaying.url !== "" && (
         <div className={"player"}>

          <AudioPlayer
            autoPlayAfterSrcChange={true}
            onEnded={nextSong}
            layout={"horizontal-reverse"}
            header={<Header title={nowPlaying.title} image={nowPlaying.image} />}
            src={nowPlaying.url} autoPlay />
        </div>
      )}
    </div>
  )
}

export default MyApp
