import api from './api'

export interface Student {
  id: number
  name: string
  document: string
  age: number
  gender: string
  turn: string
  grade: number
}

export default {
  async getAll() {
    const response = await api.get<Student[]>('/students')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<Student>(`/students/${id}`)
    return response.data
  },

  async create(student: Omit<Student, 'id'>) {
    const response = await api.post<Student>('/students', student)
    return response.data
  },

  async update(id: number, student: Partial<Student>) {
    const response = await api.put<Student>(`/students/${id}`, student)
    return response.data
  },

  async delete(id: number) {
    await api.delete(`/students/${id}`)
  },
}
