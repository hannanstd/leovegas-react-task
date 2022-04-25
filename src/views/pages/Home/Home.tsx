import React, { VFC } from 'react'
import Button from '@mui/material/Button'
import config from 'App.config'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'
import useStyles from './Home.styles'

const Home: VFC = () => {
  const classes = useStyles()
  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {config.APP_NAME}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Welcome, Click on the button below to start.
      </Typography>
      <div className={classes.buttonContainer}>
        <Link to="/search?q=matrix">
          <Button variant="contained">Search Movies</Button>
        </Link>
      </div>
    </Container>
  )
}

export default Home
