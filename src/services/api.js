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

    let data;
    try {
      data = await response.json()
    } catch (parseError) {
      if (!response.ok) {
        if (response.status === 413) throw new ApiError('Ukuran file terlalu besar (melebihi limit server).', response.status)
        if (response.status >= 500) throw new ApiError(`Server mengalami gangguan (Error ${response.status}).`, response.status)
        throw new ApiError(`Request gagal dengan status ${response.status}`, response.status)
      }
      throw new ApiError('Format respons dari server tidak valid.', response.status || 0)
    }

    if (!response.ok) {
      let errorMessage = data.message || `Request failed with status ${response.status}`
      
      if (response.status === 422 && data.errors) {
        errorMessage = Object.values(data.errors)[0][0] || errorMessage
      }
      
      throw new ApiError(
        errorMessage,
        response.status,
        data.errors || null
      )
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError('Koneksi timeout. Periksa jaringan Anda.', 0)
    }
    throw new ApiError('Tidak dapat terhubung ke server. Pastikan koneksi internet stabil.', 0)
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

export async function apiPostFormData(endpoint, formData) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout for file uploads

  const url = new URL(`${BASE_URL}${endpoint}`)

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        // Do NOT set Content-Type header so browser can set it automatically with boundaries
      },
    })

    let data;
    try {
      data = await response.json()
    } catch (parseError) {
      if (!response.ok) {
        if (response.status === 413) throw new ApiError('Ukuran file gambar terlalu besar (melebihi limit server).', response.status)
        if (response.status >= 500) throw new ApiError(`Gagal memproses gambar (Error ${response.status}). Mungkin ukuran resolusi terlalu besar.`, response.status)
        throw new ApiError(`Upload gagal dengan status ${response.status}`, response.status)
      }
      throw new ApiError('Format respons dari server tidak valid.', response.status || 0)
    }

    if (!response.ok) {
      let errorMessage = data.message || `Request failed with status ${response.status}`
      
      if (response.status === 422 && data.errors) {
        errorMessage = Object.values(data.errors)[0][0] || errorMessage
      }
      
      throw new ApiError(
        errorMessage,
        response.status,
        data.errors || null
      )
    }

    return data
  } catch (error) {
    console.error('API Error (Upload):', error)
    if (error instanceof ApiError) throw error
    if (error.name === 'AbortError') {
      throw new ApiError('Upload timeout. Gambar mungkin terlalu besar atau koneksi lambat.', 0)
    }
    throw new ApiError('Tidak dapat terhubung ke server saat upload.', 0)
  } finally {
    clearTimeout(timeoutId)
  }
}

export { ApiError }
