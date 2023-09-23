import React, { useEffect } from 'react'
import ScrollToTop from './hooks/scrollToTop'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom'
import LayoutLanding from './components/@layout/landing'
import LayoutApp from './components/@layout/app'
import PageLanding from './pages/Landing'
import PageContract from './pages/Contract'
import PageDashboard from './pages/Dashboard'
import PageSettings from './pages/Settings'


export default function App() {
  useEffect(() => {
    console.log(`v${process.env.REACT_APP_VERSION}}`)
  }, [])
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route path='/app/:path?'>
            <LayoutApp>
              <Switch>
                <Route path='/app/dashboard' exact component={PageDashboard} />
                <Route path='/app/settings' component={PageSettings} />
                <Route path='/app/:projectId/:contractId' component={PageContract} />
              </Switch>
            </LayoutApp>
          </Route>
          <Route>
            <LayoutLanding>
              <Switch>
                <Route path='/' exact component={PageLanding} />
                <Route path="*"><Redirect to="/" /></Route>
              </Switch>
            </LayoutLanding>
          </Route>
        </Switch>
      </ScrollToTop>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  )
}