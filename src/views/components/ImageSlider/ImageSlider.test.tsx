import { act, fireEvent, render } from '@testing-library/react'
import ImageSlider from './ImageSlider'
import { provideTheme, randomNumber } from '__test__'

describe('testing ImageSlider', (): void => {
  it('to be empty if open=false', (): void => {
    const { queryByTestId } = render(
      provideTheme(
        <ImageSlider open={false} imageUrls={[]} onClose={() => {}} />
      )
    )

    expect(queryByTestId('container')).not.toBeInTheDocument()
  })

  it('to be non-empty open=true', (): void => {
    const { getByTestId } = render(
      provideTheme(
        <ImageSlider open={true} imageUrls={[]} onClose={() => {}} />
      )
    )

    expect(getByTestId('container')).toBeInTheDocument()
  })

  it('to call onClose callback', async (): Promise<void> => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      provideTheme(<ImageSlider open={true} imageUrls={[]} onClose={onClose} />)
    )

    act(() => {
      fireEvent.click(getByTestId('close-button'))
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('to show image slider if has urls', async (): Promise<void> => {
    const { getByTestId } = render(
      provideTheme(
        <ImageSlider
          open={true}
          imageUrls={['https://test.image']}
          onClose={() => {}}
        />
      )
    )

    expect(getByTestId('image-container')).toBeInTheDocument()
  })

  it('to have pagination', async (): Promise<void> => {
    const length: number = randomNumber(100)
    const imageUrls: string[] = Array.from(
      { length },
      (_) => `https://test.image`
    )

    const { getByTestId } = render(
      provideTheme(
        <ImageSlider open={true} imageUrls={imageUrls} onClose={() => {}} />
      )
    )

    const buttons = getByTestId('pagination-container').getElementsByTagName(
      'button'
    )

    expect(buttons[buttons.length - 2]).toHaveTextContent(`${length}`)
  })
})
