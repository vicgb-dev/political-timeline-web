import { HOST, TOPIC } from '../constants/api'
import { DEBUG } from '../constants/debug'
import { FakeTopics } from '../constants/mocks/mock-topics'
import { Topic } from '../models/topic.interface'
import { TopicRepo } from '../repositories/topic-repository'

export class TopicService {
  static async getTopic (id: number): Promise<Topic> {
    const topic: Topic | null = TopicRepo.getTopic(id)

    return {
      id: 1,
      title: 'Tema del evento para agruparlos',
      article: 'article',
      startDate: new Date(),
      endDate: new Date()
    }

    // if (topic) {
    //   return topic
    // } else {
    //   try {
    //     const response = await fetch(`${HOST}${TOPIC}/${id}`)
    //     if (!response.ok) {
    //       throw new Error('Error al obtener los datos de la API')
    //     }
    //     const data: Topic = await response.json()
    //     TopicRepo.pushTopic(data)
    //     return data
    //   } catch (error) {
    //     console.error('Error en la llamada a la API:', error)
    //     throw error
    //   }
    // }
  }

  static async getTopics (): Promise<Topic[]> {
    try {
      const response = await fetch(`${HOST}${TOPIC}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      const data: Topic[] = await response.json()
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }

  static async getTopicsByTitle (title: string): Promise<Topic[]> {
    if (DEBUG) {
      const topics = FakeTopics.filter(topic => topic.title.toLowerCase().includes(title.toLowerCase()))
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(topics)
        }, 500)
      })
    }

    try {
      const response = await fetch(`${HOST}${TOPIC}?title=${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API')
      }
      const data: Topic[] = await response.json()
      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      throw error
    }
  }
}
