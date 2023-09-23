import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-tooltip/dist/react-tooltip.css'
import './assets/styles/global.css'
import WagmiClient from './components/WagmiClient'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorBoundary from './hooks/errorBoundary'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import EventsReader from './components/EventsReader'

ReactDOM.render(
  <React.StrictMode>
    <WagmiClient>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary>
            <EventsReader />
            <App />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </WagmiClient>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.unregister()