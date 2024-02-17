// Clase para almacenar lo que voy pidiendo a la base de datos para ahorrar en llamadas

import { Topic } from '../models/topic.interface'

const MAX_TOPICS = 10

export class TopicRepo {
  static topicsCached: Topic[] = []
  static getTopic (id: number): Topic | null {
    const topic = this.topicsCached.find(topic => topic.id === id)

    if (topic) {
      return topic
    }

    return null
  }

  static pushTopic (topic: Topic): void {
    // Si no lo encuentro en el array lo añado
    if (!this.topicsCached.find(t => t.id === topic.id)) {
      this.topicsCached.unshift(topic)

      // Si hay demasiados topics guardados eliminar el último elemento de la lista
      if (this.topicsCached.length > MAX_TOPICS) {
        this.topicsCached.pop()
      }
    }
  }
}
