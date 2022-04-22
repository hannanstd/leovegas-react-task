import React, { FC, VFC } from 'react'
import { createPortal } from 'react-dom'

const ID: string = 'header-portal'

export const HeaderPortalContainer: VFC = () => (
  <div id={ID} style={{ flex: 1 }} />
)

export const HeaderPortal: FC = ({ children = null }) =>
  createPortal(children, document.getElementById(ID) as Element)

export default HeaderPortal
