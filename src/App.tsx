import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteSwitch from 'views/components/RouteSwitch'
import Layout from 'views/layout'
import routes from 'views/routes'
import theme from 'theme'

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <RouteSwitch routes={routes} />
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
