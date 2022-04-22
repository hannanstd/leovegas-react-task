import { FC } from 'react'
import Container from '@mui/material/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import useStyles from './Layout.styles'

const Layout: FC = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header />
      <Container component="main" maxWidth="lg" className={classes.main}>
        {children}
      </Container>
      <Footer />
    </div>
  )
}
export default Layout
