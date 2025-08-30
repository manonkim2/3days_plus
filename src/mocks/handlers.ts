import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/__ping', () =>
    HttpResponse.json({
      ok: true,
    }),
  ),
]
