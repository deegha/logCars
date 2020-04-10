
// import App from 'next/app'
import { useState, useEffect } from "react"
import "../sharedStyles/styles.scss"
import { initGA, logPageView } from '../uitls/analatics'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if(process.env.NODE_ENV !== "development") {
      if (!window.GA_INITIALIZED) {
        initGA()
        window.GA_INITIALIZED = true
      }
      logPageView()
    }

    window.addEventListener("resize", resize)
  })

  const resize = () => {
    let curIsMobile = (window.innerWidth <= 760);
    if (curIsMobile !== isMobile) {
      setIsMobile(curIsMobile);
    }
  }

  const [isMobile, setIsMobile] = useState(false)

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
