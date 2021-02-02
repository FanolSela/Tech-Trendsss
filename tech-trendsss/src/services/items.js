import api from './api-config';

export const createItem = async (data) => {
  const resp = await api.post('/items', { item: data })
  return resp.data
}

export const readAllItems = async () => {
  const resp = await api.get('/items')
  return resp.data
}

export const readOneItem = async (id) => {
  const resp = await api.get(`/items/${id}`);
  return resp.data
}

export const updateItem = async (id, data) => {
  const resp = await api.put(`/items/${id}`, { items: data })
  return resp.data
}

export const destroyItem = async (id) => {
  const resp = await api.delete(`/items/${id}`)
  return resp.data
}