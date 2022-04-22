import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>Hello World</div>
    </ThemeProvider>
  )
}

export default App
