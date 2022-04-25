import React, { VFC } from 'react'
import config from 'App.config'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useStyles from './Footer.styles'

const Footer: VFC = () => {
  const classes = useStyles()
  return (
    <Box component="footer" className={classes.root}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        {config.APP_NAME}
        {' ' + new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  )
}

export default Footer
