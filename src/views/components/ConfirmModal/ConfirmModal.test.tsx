import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import ConfirmModalContainer, { confirm } from './ConfirmModal'
import provideTheme from '__test__/provideTheme'

let documentBody: RenderResult

const randomString: string = (Math.random() + 1).toString(36).substring(7)

describe('testing ConfirmModal', (): void => {
  beforeEach(() => {
    documentBody = render(provideTheme(<ConfirmModalContainer />))
  })

  it('to be in document', (): void => {
    const { container } = documentBody
    expect(container).toBeInTheDocument()
  })

  it('to be empty by default', (): void => {
    const { queryByTestId } = documentBody
    expect(queryByTestId('container')).not.toBeInTheDocument()
  })

  it('to have entered title', (): void => {
    const { getByTestId } = documentBody
    const title: string = randomString

    act(() => confirm({ title, onConfirm: () => {} }))

    expect(getByTestId('title-text')).toHaveTextContent(title)
  })

  it('to have entered message', (): void => {
    const { getByTestId } = documentBody
    const message: string = randomString

    act(() => confirm({ message, onConfirm: () => {} }))

    expect(getByTestId('message-text')).toHaveTextContent(message)
  })

  it('to have entered confirm text', (): void => {
    const { getByTestId } = documentBody
    const confirmText: string = randomString

    act(() => confirm({ confirmText, onConfirm: () => {} }))

    expect(getByTestId('confirm-button')).toHaveTextContent(confirmText)
  })

  it('to have entered cancel text', (): void => {
    const { getByTestId } = documentBody
    const cancelText: string = randomString

    act(() => confirm({ cancelText, onConfirm: () => {} }))

    expect(getByTestId('cancel-button')).toHaveTextContent(cancelText)
  })

  it('to call onConfirm after click confirm', async (): Promise<void> => {
    const { getByTestId } = documentBody
    const onConfirm = jest.fn()

    // noinspection ES6MissingAwait
    act(() => confirm({ onConfirm }))

    act(() => {
      fireEvent.click(getByTestId('confirm-button'))
    })

    expect(onConfirm).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => getByTestId('container'))
  })

  it('to call onCancel after click cancel', async (): Promise<void> => {
    const { getByTestId } = documentBody
    const onCancel = jest.fn()

    // noinspection ES6MissingAwait
    act(() => confirm({ onConfirm: () => {}, onCancel }))

    act(() => {
      fireEvent.click(getByTestId('cancel-button'))
    })

    expect(onCancel).toHaveBeenCalledTimes(1)
    await waitForElementToBeRemoved(() => getByTestId('container'))
  })
})
