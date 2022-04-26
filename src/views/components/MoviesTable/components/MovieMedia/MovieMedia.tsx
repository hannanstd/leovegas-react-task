import React, { VFC } from 'react'
import { useQuery } from 'hooks'
import FloatingVideoPlayer from 'views/components/FloatingVideoPlayer'
import ImageSlider from 'views/components/ImageSlider'

export enum MovieMediaEnum {
  Image,
  Video,
}

export interface MovieMediaProps {
  type: MovieMediaEnum | undefined
  movieId: number | string | undefined
  onClose: () => void
}

const MovieMedia: VFC<MovieMediaProps> = ({ movieId, type, onClose }) => {
  const isVideoEnabled: boolean = !!movieId && type === MovieMediaEnum.Video
  const isImageEnabled: boolean = !!movieId && type === MovieMediaEnum.Image

  const { data: videoUrls, isLoading: isVideoLoading } = useQuery(
    'movieVideos',
    { variables: { id: movieId ?? '' }, options: { enabled: isVideoEnabled } }
  )

  const { data: imageUrls, isLoading: isImageLoading } = useQuery(
    'movieImages',
    { variables: { id: movieId ?? '' }, options: { enabled: isImageEnabled } }
  )

  return (
    <>
      <FloatingVideoPlayer
        videoUrls={videoUrls ?? []}
        open={isVideoEnabled}
        onClose={onClose}
        isLoading={isVideoLoading}
      />
      <ImageSlider
        imageUrls={imageUrls ?? []}
        open={isImageEnabled}
        onClose={onClose}
        isLoading={isImageLoading}
      />
    </>
  )
}

export default MovieMedia
