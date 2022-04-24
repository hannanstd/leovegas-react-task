import React, { VFC } from 'react'
import { useQuery } from 'hooks'
import ImageSlider, { ImageSliderProps } from '../ImageSlider'

export interface MovieImageSliderProps
  extends Pick<ImageSliderProps, 'show' | 'onClose'> {
  id: string | number
}

const MovieImageSlider: VFC<MovieImageSliderProps> = ({ id, ...props }) => {
  const { data: imageUrls, isLoading } = useQuery('movieImages', {
    variables: { id },
    options: { enabled: props.show },
  })

  return (
    <ImageSlider imageUrls={imageUrls ?? []} isLoading={isLoading} {...props} />
  )
}

export default MovieImageSlider
