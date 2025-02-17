import api from './api'

export interface Subject {
  id: number
  name: string
}

export default {
  async getAll() {
    const response = await api.get<Subject[]>('/subjects')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<Subject>(`/subjects/${id}`)
    return response.data
  },

  async create(subject: Omit<Subject, 'id'>) {
    const response = await api.post<Subject>('/subjects', subject)
    return response.data
  },

  async update(id: number, subject: Partial<Subject>) {
    const response = await api.put<Subject>(`/subjects/${id}`, subject)
    return response.data
  },

  async delete(id: number) {
    await api.delete(`/subjects/${id}`)
  },
}
