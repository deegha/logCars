
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


      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var t=analytics.methods[e];analytics[t]=analytics.factory(t)}analytics.load=function(e,t){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=t};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load("kqw3ULhgYZS3RhRuej698taB0LkxunM2");
      analytics.page();
      }}();
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
