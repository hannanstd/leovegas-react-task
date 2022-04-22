import React, { FC, VFC } from 'react'
import { createPortal } from 'react-dom'
import Box from '@mui/material/Box'

const ID: string = 'header-portal'

export const HeaderPortalContainer: VFC = () => <Box id={ID} sx={{ flex: 1 }} />

export const HeaderPortal: FC = ({ children = null }) =>
  createPortal(children, document.getElementById(ID) as Element)

export default HeaderPortal
