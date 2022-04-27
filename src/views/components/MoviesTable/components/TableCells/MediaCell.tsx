import React, { VFC } from 'react'
import IconButton from '@mui/material/IconButton'
import VideoIcon from '@mui/icons-material/OndemandVideo'
import ImageIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import { MovieIdType } from 'types/Movies.types'
import { MoviesTableCellsProps } from '../../MoviesTable'

export interface MediaCellProps extends MoviesTableCellsProps {
  onVideoClick: (id: MovieIdType) => void
  onImageClick: (id: MovieIdType) => void
  videoDisabled?: boolean
  imageDisabled?: boolean
}

const MediaCell: VFC<MediaCellProps> = ({
  row,
  onVideoClick,
  onImageClick,
  videoDisabled = false,
  imageDisabled = false,
}) => {
  return (
    <>
      <IconButton
        color="secondary"
        size="medium"
        disabled={videoDisabled}
        onClick={() => onVideoClick(row.id)}
      >
        <VideoIcon />
      </IconButton>
      <IconButton
        color="secondary"
        size="medium"
        disabled={imageDisabled}
        onClick={() => onImageClick(row.id)}
      >
        <ImageIcon />
      </IconButton>
    </>
  )
}
export default MediaCell
