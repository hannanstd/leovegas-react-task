import { act, render, RenderResult } from '@testing-library/react'
import ToastContainer, { toast } from './Toast'
import { randomString } from '__test__'

let documentBody: RenderResult

describe('testing Toast', (): void => {
  beforeEach(() => {
    documentBody = render(<ToastContainer />)
  })

  it('to be in document', (): void => {
    const { container } = documentBody
    expect(container).toBeInTheDocument()
  })

  it('to be empty by default', (): void => {
    const { queryByTestId } = documentBody
    expect(queryByTestId('container')).not.toBeInTheDocument()
  })

  it('to have entered message', (): void => {
    const { getByTestId } = documentBody
    const message: string = randomString()
    const idx: string = 'idx-' + Date.now()

    act(() => toast({ idx, type: 'success', message }))

    expect(getByTestId(`alert-${idx}`)).toHaveTextContent(message)
  })

  it('to have multiple alert', (): void => {
    const { getAllByTestId } = documentBody
    const message: string = randomString()
    const length: number = 3
    act(() => {
      for (let i: number = 0; i < length; i++) {
        toast({ type: 'success', message: message + i })
      }
    })
    expect(getAllByTestId(/alert-/i)).toHaveLength(length)
  })

  it('to be disappeared after timeout', (): void => {
    jest.useFakeTimers()

    const { queryByTestId } = documentBody
    const timeout: number = 5000
    const message: string = randomString()
    const idx: string = 'idx-' + Date.now()

    expect(queryByTestId(`alert-${idx}`)).not.toBeInTheDocument()

    act(() => toast({ idx, type: 'success', message, duration: timeout }))

    expect(queryByTestId(`alert-${idx}`)).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(timeout - 1)
    })

    expect(queryByTestId(`alert-${idx}`)).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(queryByTestId(`alert-${idx}`)).not.toBeInTheDocument()
  })
})
