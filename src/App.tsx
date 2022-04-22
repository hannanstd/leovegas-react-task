import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteSwitch from 'components/RouteSwitch'
import theme from 'theme'
import routes from 'routes'
import Layout from 'Layout'

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
