import React, { VFC } from 'react'
import config from 'App.config'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { HeaderPortalContainer } from './HeaderPortal'
import useStyles from './Header.styles'

export interface HeaderProps {}
const Header: VFC<HeaderProps> = () => {
  const classes = useStyles()
  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {config.APP_NAME}
        </Typography>
        <HeaderPortalContainer />
      </Toolbar>
    </AppBar>
  )
}

export default Header
