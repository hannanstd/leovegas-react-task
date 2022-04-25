import { MovieIdType, TableCellsProps } from '../../MoviesTable.types'
import React, { VFC } from 'react'
import IconButton from '@mui/material/IconButton/IconButton'
import VideoIcon from '@mui/icons-material/OndemandVideo'

export interface VideoCellProps extends TableCellsProps {
  onClick: (id: MovieIdType) => void
  disabled: boolean
}
const VideoCell: VFC<VideoCellProps> = ({ row, onClick, disabled }) => {
  return (
    <IconButton
      color="secondary"
      size="medium"
      disabled={disabled}
      onClick={() => onClick(row.id)}
    >
      <VideoIcon />
    </IconButton>
  )
}
export default VideoCell
