import React, { Fragment, useEffect, useState, VFC } from 'react'
import useStyles from './FloatingVideoPlayer.styles'
import Pagination from '@mui/material/Pagination'
import Loading from 'views/components/Loading'
import IconButton from '@mui/material/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CloseIcon from '@mui/icons-material/Close'
import ButtonGroup from '@mui/material/ButtonGroup'
import VideoPlayer from '../VideoPlayer'

export interface FloatingVideoPlayerProps {
  videoUrls: string[]
  open: boolean
  onClose: () => void
  isLoading?: boolean
}

const FloatingVideoPlayer: VFC<FloatingVideoPlayerProps> = ({
  videoUrls,
  open = false,
  onClose,
  isLoading = false,
}) => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const classes = useStyles({ fullScreen })()
  const [index, setIndex] = useState<number>(0)
  useEffect(() => setIndex(0), [videoUrls])

  return open ? (
    <div data-testid="container" className={classes.root}>
      <ButtonGroup variant="text" className={classes.topBar}>
        <IconButton
          size="small"
          color="primary"
          data-testid="fullscreen-button"
          onClick={() => setFullScreen((prev) => !prev)}
        >
          <FullscreenIcon />
        </IconButton>
        <IconButton
          size="small"
          color="primary"
          data-testid="close-button"
          onClick={() => onClose?.()}
        >
          <CloseIcon />
        </IconButton>
      </ButtonGroup>

      {isLoading ? (
        <Loading />
      ) : !videoUrls?.length ? (
        <div>No videos found</div>
      ) : (
        <>
          <div data-testid="player-container" className={classes.playerRoot}>
            <VideoPlayer url={videoUrls?.[index]} />
          </div>
          <Pagination
            data-testid="pagination-container"
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
