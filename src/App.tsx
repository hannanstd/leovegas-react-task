import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import RouteSwitch from './components/RouteSwitch'
import routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom'

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RouteSwitch routes={routes} />
      </Router>
    </ThemeProvider>
  )
}

export default App
