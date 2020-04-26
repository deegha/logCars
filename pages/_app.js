
// import App from 'next/app'
import { useState, useEffect } from "react"
import "../sharedStyles/styles.scss"
import { initGA, logPageView } from '../uitls/analatics'
import AppContextProvider from "../context/app-context"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
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
    <AppContextProvider>
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <AlertProvider template={AlertTemplate} {...options}>
      <Component {...pageProps} />
      </AlertProvider>
    </div>
    </AppContextProvider>
  )
}

export default MyApp
