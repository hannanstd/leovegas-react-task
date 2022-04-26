import React, { VFC } from 'react'
import { NavLink } from 'react-router-dom'
import useStyles from './HeaderDesktopLinks.styles'
import Typography from '@mui/material/Typography'
import { HeaderLinkProps } from '../HeaderLinks'

export interface HeaderDesktopLinksProps {
  links: HeaderLinkProps[]
}
const HeaderDesktopLinks: VFC<HeaderDesktopLinksProps> = ({ links }) => {
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <div className={classes.list}>
        {links.map(({ label, to, icon }) => (
          <NavLink
            to={to}
            key={label}
            className={({ isActive }) =>
              `${classes.item} ${isActive ? classes.activeItem : ''}`
            }
          >
            <span className={classes.icon}>{icon}</span>
            <Typography className={classes.label}>{label}</Typography>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default HeaderDesktopLinks
