import { http, HttpResponse } from 'msw'

export const handlers = [
  // User API handlers
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ])
  }),

  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      id: Number(id),
      name: `User ${id}`,
      email: `user${id}@example.com`,
    })
  }),

  http.post('/api/users', async ({ request }) => {
    const user = (await request.json()) as object
    return HttpResponse.json(
      {
        id: Date.now(),
        ...user,
      },
      { status: 201 }
    )
  }),

  // Error scenarios
  http.get('/api/users/error', () => {
    return new HttpResponse(null, { status: 500 })
  }),
]
