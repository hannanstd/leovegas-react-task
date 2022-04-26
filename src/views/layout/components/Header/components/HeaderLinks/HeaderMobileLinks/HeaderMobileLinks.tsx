import React, { MouseEvent, useState, VFC } from 'react'
import { NavLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useStyles from './HeaderMobileLinks.styles'
import { HeaderLinkProps } from '../HeaderLinks'

export interface HeaderMobileLinksProps {
  links: HeaderLinkProps[]
}
const HeaderMobileLinks: VFC<HeaderMobileLinksProps> = ({ links }) => {
  const classes = useStyles()

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const onCloseClick = () => setAnchorElNav(null)
  const onOpenClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget)

  return (
    <div className={classes.root}>
      <IconButton size="medium" onClick={onOpenClick} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        className={classes.list}
        anchorEl={anchorElNav}
        keepMounted
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={onCloseClick}
      >
        {links.map(({ label, to, icon }) => (
          <MenuItem key={label} className={classes.menuItem}>
            <NavLink
              to={to}
              onClick={onCloseClick}
              className={({ isActive }) =>
                `${classes.item} ${isActive ? classes.activeItem : ''}`
              }
            >
              <span className={classes.icon}>{icon}</span>
              <Typography className={classes.label}>{label}</Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default HeaderMobileLinks
