import React, { VFC } from 'react'
import config from 'App.config'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import SearchInput from 'views/components/SearchInput'
import useStyles from './Home.styles'

const Home: VFC = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h1"
        align="center"
        color="text.primary"
        fontWeight="bold"
      >
        {config.APP_NAME}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Welcome, Click on the button below to start.
      </Typography>
      <div className={classes.buttonContainer}>
        <SearchInput defaultValue="Matrix" />
      </div>
    </Container>
  )
}

export default Home
