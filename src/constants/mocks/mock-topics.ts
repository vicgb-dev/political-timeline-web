// export interface Topic {
//     id: number
//     title: string
//     article: string
//     startDate: Date
//     endDate: Date
// }

import { Topic } from '../../models/topic.interface'

export const FakeTopics: Topic[] = [
  {
    id: 1,
    title: 'Topic 1',
    article: 'Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1 Article 1',
    startDate: new Date('2021-01-01'),
    endDate: new Date('2021-01-01')
  },
  {
    id: 2,
    title: 'Topic 2',
    article: 'Article 2',
    startDate: new Date('2021-01-02'),
    endDate: new Date('2021-01-02')
  },
  {
    id: 3,
    title: 'Topic 3',
    article: 'Article 3',
    startDate: new Date('2021-01-03'),
    endDate: new Date('2021-01-03')
  },
  {
    id: 4,
    title: 'Tema 4',
    article: 'Tema 4',
    startDate: new Date('2021-01-04'),
    endDate: new Date('2021-01-04')
  },
  {
    id: 5,
    title: 'Tema 5',
    article: 'Tema 5',
    startDate: new Date('2021-01-05'),
    endDate: new Date('2021-01-05')
  },
  {
    id: 6,
    title: 'Tema 6',
    article: 'Tema 6',
    startDate: new Date('2021-01-06'),
    endDate: new Date('2021-01-06')
  },
  {
    id: 7,
    title: 'Otro 7',
    article: 'Otro 7',
    startDate: new Date('2021-01-07'),
    endDate: new Date('2021-01-07')
  },
  {
    id: 8,
    title: 'Otro 8',
    article: 'Otro 8',
    startDate: new Date('2021-01-08'),
    endDate: new Date('2021-01-08')
  },
  {
    id: 9,
    title: 'Otro 9',
    article: 'Otro 9',
    startDate: new Date('2021-01-09'),
    endDate: new Date('2021-01-09')
  },
  {
    id: 10,
    title: 'Otro 10',
    article: 'Otro 10',
    startDate: new Date('2021-01-10'),
    endDate: new Date('2021-01-10')
  }
]
