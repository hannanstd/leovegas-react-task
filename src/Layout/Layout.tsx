import { FC } from 'react'
import Container from '@mui/material/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import Box from '@mui/material/Box'

const Layout: FC = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {children}
        </Container>
      </main>
      <Footer />
    </Box>
  )
}
export default Layout
