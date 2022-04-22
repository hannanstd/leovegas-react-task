import React, { VFC } from 'react'
import Button from '@mui/material/Button'
import config from 'App.config'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom'

export interface HomeProps {}

const Home: VFC<HomeProps> = () => {
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
      <Box
        sx={{
          width: 1,
          spacing: 2,
          display: 'flex',
          direction: 'row',
          justifyContent: 'center',
        }}
      >
        <Link to="/search">
          <Button variant="contained">Search Movies</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default Home
