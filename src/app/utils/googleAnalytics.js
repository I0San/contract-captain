import ReactGA from "react-ga4"

const GA = `${process.env.REACT_APP_GOOGLE_ANALITICS_ID}`

export const initGA = () => {
  if (GA && window) {
    ReactGA.initialize(GA)
  }
}

export const logPageView = (path = "") => {
  ReactGA.send({ hitType: "pageview", page: path ?? window.location.pathname })
}

export const logEvent = (category = "", action = "", label = "") => {
  if (category && action) {
    ReactGA.event({
      category,
      action,
      label, // optional
      // value: 99, // optional, must be a number
      // nonInteraction: true, // optional, true/false
      // transport: "xhr", // optional, beacon/xhr/image
    })
  }
}
