import React, { useEffect, useState, VFC } from 'react'
import { useQuery } from 'hooks'
import VideoPlayer from 'views/components/VideoPlayer'
import useStyles from './FloatingVideoPlayer.styles'
import Pagination from '@mui/material/Pagination'
import Loading from 'views/components/Loading'
import IconButton from '@mui/material/IconButton/IconButton'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import CloseIcon from '@mui/icons-material/Close'
import ButtonGroup from '@mui/material/ButtonGroup'

export interface FloatingVideoPlayerProps {
  id: string | number
  onClose?: () => void
}

const FloatingVideoPlayer: VFC<FloatingVideoPlayerProps> = ({
  id,
  onClose,
}) => {
  const [index, setIndex] = useState<number>(0)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const classes = useStyles({ fullScreen })()

  const { data: urls, isLoading } = useQuery('movieVideos', {
    variables: { id },
  })

  useEffect(() => setIndex(0), [urls])

  return (
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
      ) : !urls?.length ? (
        <div>No videos found</div>
      ) : (
        <>
          <VideoPlayer url={urls?.[index]} />
          <Pagination
            className={classes.paginationRoot}
            size="small"
            count={urls?.length || 0}
            page={index + 1}
            onChange={(_, index) => setIndex(index - 1)}
          />
        </>
      )}
    </div>
  )
}

export default FloatingVideoPlayer
