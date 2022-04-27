import { render } from '@testing-library/react'
import VideoPlayer from './VideoPlayer'

describe('testing VideoPlayer', (): void => {
  it('to be youtube in iframe tag', (): void => {
    const { container } = render(<VideoPlayer url="https://youtube.com/test" />)

    expect(container.querySelector('iframe')).toBeInTheDocument()
    expect(container.querySelector('video')).not.toBeInTheDocument()
  })

  it('to be non-youtube in video tags', (): void => {
    const { container } = render(<VideoPlayer url="https://site.com/test" />)

    expect(container.querySelector('video')).toBeInTheDocument()
    expect(container.querySelector('iframe')).not.toBeInTheDocument()
  })

  it('to have set width and height', (): void => {
    const width: number = 500
    const height: number = 500

    ;[
      { type: 'iframe', url: 'https://youtube.com/test' },
      { type: 'video', url: 'https://site.com/test' },
    ].forEach(({ type, url }) => {
      const { container } = render(
        <VideoPlayer url={url} width={width} height={height} />
      )
      const element = container.querySelector(type)
      expect(element?.getAttribute('width')).toBe(`${width}`)
      expect(element?.getAttribute('height')).toBe(`${height}`)
    })
  })
})
