const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.masjidkassiti.id/v1'
const TIMEOUT_MS = 10000

class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request(endpoint, options = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  const url = new URL(`${BASE_URL}${endpoint}`)

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value)
      }
    })
  }

  try {
    const response = await fetch(url.toString(), {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.errors || null
      )
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError('Koneksi timeout. Periksa jaringan Anda.', 0)
    }
    throw new ApiError('Tidak dapat terhubung ke server.', 0)
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function apiGet(endpoint, params = {}) {
  return request(endpoint, { method: 'GET', params })
}

export async function apiPost(endpoint, body = {}) {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export { ApiError }
