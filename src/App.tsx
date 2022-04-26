import React, { VFC } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import RouteSwitch from 'views/components/RouteSwitch'
import ToastContainer from 'views/components/Toast'
import ConfirmModalContainer from 'views/components/ConfirmModal'
import Layout from 'views/layout'
import routes from 'routes'
import theme from 'theme'

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 /*1 minute*/,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <ConfirmModalContainer />
      <Router>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Layout>
            <RouteSwitch routes={routes} />
          </Layout>
        </QueryClientProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
