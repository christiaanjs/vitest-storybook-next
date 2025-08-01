import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { http, HttpResponse } from 'msw'
import { UserList } from '../UserList'

const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onUserSelect: { action: 'user selected' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with MSW handlers
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json([
            { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
            { id: 2, name: 'Bob Wilson', email: 'bob@example.com' },
            { id: 3, name: 'Carol Brown', email: 'carol@example.com' },
          ])
        }),
      ],
    },
  },
}

// Loading state story
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', async () => {
          // Simulate slow response
          await new Promise((resolve) => setTimeout(resolve, 10000))
          return HttpResponse.json([])
        }),
      ],
    },
  },
}

// Error state story
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return new HttpResponse(null, { status: 500 })
        }),
      ],
    },
  },
}

// Empty state story
export const Empty: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('/api/users', () => {
          return HttpResponse.json([])
        }),
      ],
    },
  },
}

// Custom endpoint story
export const CustomEndpoint: Story = {
  args: {
    apiEndpoint: '/api/custom-users',
  },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/custom-users', () => {
          return HttpResponse.json([
            { id: 100, name: 'Custom User 1', email: 'custom1@example.com' },
            { id: 101, name: 'Custom User 2', email: 'custom2@example.com' },
          ])
        }),
      ],
    },
  },
}
