export interface PoliticalEvent {
    id: number
    title: string
    summary: string
    description: string
    publishingStatus: string
    idTopic: number | null
    idAuthor: string
    eventDate: Date
    importance: number
    eventImg: string | null
}
