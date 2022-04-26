import React, { VFC } from 'react'
import IconButton from '@mui/material/IconButton/IconButton'
import VideoIcon from '@mui/icons-material/OndemandVideo'
import { MovieIdType } from 'types/Movies.types'
import { MoviesTableCellsProps } from '../../MoviesTable'

export interface VideoCellProps extends MoviesTableCellsProps {
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
