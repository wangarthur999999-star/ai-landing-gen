import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DescriptionInput } from '../src/components/DescriptionInput'
import { StyleSelector } from '../src/components/StyleSelector'
import { PreviewPanel } from '../src/components/PreviewPanel'

describe('DescriptionInput', () => {
  it('renders textarea and generate button', () => {
    render(
      <DescriptionInput
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
        disabled={false}
      />
    )
    expect(screen.getByPlaceholderText(/Describe your product/)).toBeTruthy()
    expect(screen.getByText('Generate')).toBeTruthy()
  })

  it('shows character count', () => {
    render(
      <DescriptionInput
        value="Hello"
        onChange={() => {}}
        onSubmit={() => {}}
        disabled={false}
      />
    )
    expect(screen.getByText('5/500')).toBeTruthy()
  })
})

describe('StyleSelector', () => {
  it('renders all 5 style options', () => {
    render(
      <StyleSelector
        selected={null}
        onSelect={() => {}}
        disabled={false}
      />
    )
    expect(screen.getByText('Swiss')).toBeTruthy()
    expect(screen.getByText('Dark Luxury')).toBeTruthy()
    expect(screen.getByText('Neo-brutalism')).toBeTruthy()
    expect(screen.getByText('Glassmorphism')).toBeTruthy()
    expect(screen.getByText('Editorial')).toBeTruthy()
  })
})

describe('PreviewPanel', () => {
  it('shows placeholder in idle state', () => {
    render(<PreviewPanel html={null} status="idle" error={null} />)
    expect(screen.getByText(/Describe your product/)).toBeTruthy()
  })

  it('shows error message', () => {
    render(<PreviewPanel html={null} status="error" error="Something broke" />)
    expect(screen.getByText('Something broke')).toBeTruthy()
  })

  it('renders iframe when html is provided', () => {
    const { container } = render(
      <PreviewPanel html="<h1>Hello</h1>" status="done" error={null} />
    )
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeTruthy()
    expect(iframe!.getAttribute('sandbox')).toBe('')
  })
})
