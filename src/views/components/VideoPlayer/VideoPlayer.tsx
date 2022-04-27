import React, { VFC } from 'react'

export interface VideoPlayerProps {
  url: string
  width?: number | string
  height?: number | string
}

const VideoPlayer: VFC<VideoPlayerProps> = ({
  url,
  width = '100%',
  height = '100%',
}) => (
  <>
    {url.includes('youtube.com') ? (
      <iframe
        width={width}
        height={height}
        title="Youtube player"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        frameBorder="0"
        src={`${url?.replace('watch?v=', 'embed/')}?autoplay=1`}
      />
    ) : (
      <video width={width} height={height} controls autoPlay>
        <source src={url} type="video/mp4" />
      </video>
    )}
  </>
)

export default VideoPlayer
