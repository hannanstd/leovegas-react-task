import React, { useEffect, useState, VFC } from 'react'
import useStyles from './FloatingVideoPlayer.styles'
import Pagination from '@mui/material/Pagination'
import Loading from 'views/components/Loading'
import IconButton from '@mui/material/IconButton/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CloseIcon from '@mui/icons-material/Close'
import ButtonGroup from '@mui/material/ButtonGroup'
import VideoPlayer from '../VideoPlayer'

export interface FloatingVideoPlayerProps {
  videoUrls: string[]
  show: boolean
  onClose: () => void
  isLoading: boolean
}

const FloatingVideoPlayer: VFC<FloatingVideoPlayerProps> = ({
  videoUrls,
  show = false,
  onClose,
  isLoading = false,
}) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const classes = useStyles({ fullScreen })()
  const [index, setIndex] = useState<number>(0)
  useEffect(() => setIndex(0), [videoUrls])

  return show ? (
    <div className={classes.root}>
      <ButtonGroup variant="text" className={classes.topBar}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => setFullScreen((prev) => !prev)}
        >
          <FullscreenIcon />
        </IconButton>
        <IconButton size="small" color="primary" onClick={() => onClose?.()}>
          <CloseIcon />
        </IconButton>
      </ButtonGroup>

      {isLoading ? (
        <Loading />
      ) : !videoUrls?.length ? (
        <div>No videos found</div>
      ) : (
        <>
          <VideoPlayer url={videoUrls?.[index]} />
          <Pagination
            className={classes.paginationRoot}
            size="small"
            count={videoUrls?.length || 0}
            page={index + 1}
            onChange={(_, index) => setIndex(index - 1)}
          />
        </>
      )}
    </div>
  ) : null
}

export default FloatingVideoPlayer
