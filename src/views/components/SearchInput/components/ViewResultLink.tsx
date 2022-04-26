import React, { VFC } from 'react'
import ListItemButton from '@mui/material/ListItemButton'

export interface ViewResultLinkProps {
  value: string
  onClick: (value: string) => void
}

const ViewResultLink: VFC<ViewResultLinkProps> = ({ onClick, value }) => {
  return (
    <ListItemButton
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onClick(value)}
      style={{
        width: '100%',
        cursor: 'pointer',
        padding: '8px 12px',
      }}
    >
      See all results for "{value}"
    </ListItemButton>
  )
}

export default ViewResultLink
