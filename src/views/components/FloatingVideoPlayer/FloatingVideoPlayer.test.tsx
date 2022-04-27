import { act, fireEvent, render } from '@testing-library/react'
import FloatingVideoPlayer from './FloatingVideoPlayer'
import provideTheme from '__test__/provideTheme'

describe('testing FloatingVideoPlayer', (): void => {
  it('to be empty if open=false', (): void => {
    const { queryByTestId } = render(
      provideTheme(
        <FloatingVideoPlayer open={false} videoUrls={[]} onClose={() => {}} />
      )
    )

    expect(queryByTestId('container')).not.toBeInTheDocument()
  })

  it('to be non-empty open=true', (): void => {
    const { getByTestId } = render(
      provideTheme(
        <FloatingVideoPlayer open={true} videoUrls={[]} onClose={() => {}} />
      )
    )

    expect(getByTestId('container')).toBeInTheDocument()
  })

  it('to call onClose callback', async (): Promise<void> => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      provideTheme(
        <FloatingVideoPlayer open={true} videoUrls={[]} onClose={onClose} />
      )
    )

    act(() => {
      fireEvent.click(getByTestId('close-button'))
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('to show video player if has urls', async (): Promise<void> => {
    const { getByTestId } = render(
      provideTheme(
        <FloatingVideoPlayer
          open={true}
          videoUrls={['https://test.video']}
          onClose={() => {}}
        />
      )
    )

    expect(getByTestId('player-container')).toBeInTheDocument()
  })

  it('to have pagination', async (): Promise<void> => {
    const length: number = Math.floor(Math.random() * (100 - 1)) + 1
    const videoUrls: string[] = Array.from(
      { length },
      (_) => `https://test.video`
    )

    const { getByTestId } = render(
      provideTheme(
        <FloatingVideoPlayer
          open={true}
          videoUrls={videoUrls}
          onClose={() => {}}
        />
      )
    )

    const buttons = getByTestId('pagination-container').getElementsByTagName(
      'button'
    )

    expect(buttons[buttons.length - 2]).toHaveTextContent(`${length}`)
  })
})
