import api from './api'

export interface Exam {
  id: number
  score: number
  studentId: number
  subjectId: number
}

export default {
  async getAll() {
    const response = await api.get<Exam[]>('/exams')
    return response.data
  },

  async getById(id: number) {
    const response = await api.get<Exam>(`/exams/${id}`)
    return response.data
  },

  async create(exam: Omit<Exam, 'id'>) {
    const response = await api.post<Exam>('/exams', exam)
    return response.data
  },

  async update(id: number, exam: Partial<Exam>) {
    const response = await api.put<Exam>(`/exams/${id}`, exam)
    return response.data
  },

  async delete(id: number) {
    await api.delete(`/exams/${id}`)
  },
}
