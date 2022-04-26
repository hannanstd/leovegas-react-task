import React, { VFC } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { HeaderPortalContainer } from './components/HeaderPortal'
import useStyles from './Header.styles'
import HeaderLinks from './components/HeaderLinks'

const Header: VFC = () => {
  const classes = useStyles()
  return (
    <AppBar position="relative" className={classes.root}>
      <Toolbar>
        <HeaderLinks />
        <HeaderPortalContainer />
      </Toolbar>
    </AppBar>
  )
}

export default Header
