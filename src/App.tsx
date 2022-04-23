import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import RouteSwitch from 'views/components/RouteSwitch'
import Layout from 'views/layout'
import routes from 'views/routes'
import theme from 'theme'

const queryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <RouteSwitch routes={routes} />
          </Layout>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
