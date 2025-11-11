const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tomates.com'

function buildUrl(endpoint) {
    return `${BASE_URL}/${endpoint}`
}

function handleResponse(res) {
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
    return res.json()
}

export const api = {
    get: async (endpoint, params = {}) => {
        const query = new URLSearchParams(params).toString()
        const url = query ? `${buildUrl(endpoint)}?${query}` : buildUrl(endpoint)
        const res = await fetch(url)
        return handleResponse(res)
    },

    post: async (endpoint, data) => {
        const res = await fetch(buildUrl(endpoint), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return handleResponse(res)
    },

    put: async (endpoint, data) => {
        const res = await fetch(buildUrl(endpoint), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return handleResponse(res)
    },

    patch: async (endpoint, data) => {
        const res = await fetch(buildUrl(endpoint), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        return handleResponse(res)
    },

    delete: async (endpoint) => {
        const res = await fetch(buildUrl(endpoint), { method: 'DELETE' })
        return handleResponse(res)
    },
}
