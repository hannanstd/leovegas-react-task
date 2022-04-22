import React, { VFC } from 'react'
import config from 'App.config'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export interface FooterProps {}

const Footer: VFC<FooterProps> = () => {
  return (
    <Box component="footer" sx={{ p: 1, mt: 'auto' }}>
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
