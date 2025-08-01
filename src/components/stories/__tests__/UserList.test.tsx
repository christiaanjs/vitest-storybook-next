import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/nextjs-vite'
import { UserList } from '../../UserList'
import * as stories from '../UserList.stories'

// Compose stories for testing
const { Default, Error, Empty } = composeStories(stories)

describe('UserList Component', () => {
  describe('Using Storybook Stories', () => {
    it('renders default story correctly', async () => {
      render(<Default />)

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })

      // Check if users are rendered
      expect(screen.getByTestId('user-list')).toBeInTheDocument()
      expect(
        screen.getByText('Alice Johnson (alice@example.com)')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Bob Wilson (bob@example.com)')
      ).toBeInTheDocument()
    })

    it('renders error story correctly', async () => {
      render(<Error />)

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument()
      })

      expect(
        screen.getByText(/Error: Failed to fetch users/)
      ).toBeInTheDocument()
    })

    it('renders empty story correctly', async () => {
      render(<Empty />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })

      expect(screen.getByTestId('user-list')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      // No user buttons should be present
      expect(screen.queryByTestId(/user-\d+/)).not.toBeInTheDocument()
    })

    it('handles user selection in stories', async () => {
      const onUserSelect = vi.fn()
      render(<Default onUserSelect={onUserSelect} />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })

      const userButton = screen.getByTestId('user-1')
      fireEvent.click(userButton)

      expect(onUserSelect).toHaveBeenCalledWith({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
      })
    })
  })

  describe('Using Vitest Mocks', () => {
    const mockFetch = vi.fn()

    beforeEach(() => {
      global.fetch = mockFetch
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    it('renders users with successful fetch', async () => {
      const mockUsers = [
        { id: 1, name: 'Mock User 1', email: 'mock1@example.com' },
        { id: 2, name: 'Mock User 2', email: 'mock2@example.com' },
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      } as Response)

      render(<UserList />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })

      expect(
        screen.getByText('Mock User 1 (mock1@example.com)')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Mock User 2 (mock2@example.com)')
      ).toBeInTheDocument()
    })

    it('handles fetch error with vitest mock', async () => {
      mockFetch.mockRejectedValueOnce(new globalThis.Error('Network error'))

      render(<UserList />)

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument()
      })

      expect(screen.getByText('Error: Network error')).toBeInTheDocument()
    })

    it('calls custom endpoint with vitest mock', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response)

      render(<UserList apiEndpoint="/custom/endpoint" />)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith('/custom/endpoint')
      })
    })
  })

  describe('Mixed Testing Approaches', () => {
    it('can combine story rendering with vitest mocks for callbacks', async () => {
      const mockCallback = vi.fn()

      // Use the story's MSW setup but override the callback
      render(<Default onUserSelect={mockCallback} />)

      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })

      const userButton = screen.getByTestId('user-1')
      fireEvent.click(userButton)

      expect(mockCallback).toHaveBeenCalledTimes(1)
      expect(mockCallback).toHaveBeenCalledWith({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
      })
    })
  })
})
