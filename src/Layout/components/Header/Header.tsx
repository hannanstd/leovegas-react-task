import React, { VFC } from 'react'
import config from 'App.config'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { HeaderPortalContainer } from './HeaderPortal'

export interface HeaderProps {}

const Header: VFC<HeaderProps> = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2 }}>
          {config.APP_NAME}
        </Typography>
        <HeaderPortalContainer />
      </Toolbar>
    </AppBar>
  )
}

export default Header
