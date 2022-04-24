import React, { VFC } from 'react'
import { useQuery } from 'hooks'
import FloatingVideoPlayer, {
  FloatingVideoPlayerProps,
} from '../FloatingVideoPlayer'

export interface MovieFloatingVideoPlayerProps
  extends Pick<FloatingVideoPlayerProps, 'show' | 'onClose'> {
  id: string | number
}

const MovieFloatingVideoPlayer: VFC<MovieFloatingVideoPlayerProps> = ({
  id,
  ...props
}) => {
  const { data: videoUrls, isLoading } = useQuery('movieVideos', {
    variables: { id },
    options: { enabled: props.show },
  })

  return (
    <FloatingVideoPlayer
      videoUrls={videoUrls ?? []}
      isLoading={isLoading}
      {...props}
    />
  )
}

export default MovieFloatingVideoPlayer
