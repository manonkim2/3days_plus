import { render, screen } from '@testing-library/react'

function DummyPage() {
  return <h1>Hello World</h1>
}

describe('DummyPage', () => {
  it('renders h1', () => {
    render(<DummyPage />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
