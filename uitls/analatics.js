import ReactGA from 'react-ga'
export const initGA = () => {
  console.log('GA init')
  ReactGA.initialize('UA-119670959-1')
  ReactGA.initialize('UA-168042521-3')
  ReactGA.initialize('AW-1011268385')
}

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}
