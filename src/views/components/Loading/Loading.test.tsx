import { render } from '@testing-library/react'
import Loading from './Loading'

describe('testing Loading', (): void => {
  it('to be non-empty', (): void => {
    const { container } = render(<Loading />)
    expect(container).not.toBeEmptyDOMElement()
  })
})
