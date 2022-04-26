import React, { VFC } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import HeaderDesktopLinks from './HeaderDesktopLinks'
import HeaderMobileLinks from './HeaderMobileLinks'
import { useMediaQuery } from '@mui/material'
import theme from 'theme'
import routes from 'routes'

export type HeaderLinkProps = { icon: JSX.Element; label: string; to: string }

const links: HeaderLinkProps[] = [
  { label: 'Home', icon: <HomeIcon />, to: routes.home.path },
  { label: 'Search', icon: <LiveTvIcon />, to: routes.search.path },
  { label: 'My Channels', icon: <FactCheckIcon />, to: routes.channels.path },
]

const HeaderLinks: VFC = () => {
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'))
  return isMobile ? (
    <HeaderMobileLinks links={links} />
  ) : (
    <HeaderDesktopLinks links={links} />
  )
}

export default HeaderLinks
