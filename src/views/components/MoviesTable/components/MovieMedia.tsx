import React, { VFC } from 'react'
import MovieFloatingVideoPlayer from 'views/components/Video/MovieFloatingVideoPlayer'
import MovieImageSlider from 'views/components/Image/MovieImageSlider'

export enum MovieMediaEnum {
  Image,
  Video,
}

export interface MovieMediaProps {
  type: MovieMediaEnum | undefined
  id: number | string | undefined
  onClose: () => void
}

const MovieMedia: VFC<MovieMediaProps> = ({ id, type, onClose }) => {
  return id ? (
    <>
      <MovieFloatingVideoPlayer
        show={type === MovieMediaEnum.Video}
        id={id}
        onClose={onClose}
      />

      <MovieImageSlider
        show={type === MovieMediaEnum.Image}
        id={id}
        onClose={onClose}
      />
    </>
  ) : null
}

export default MovieMedia
