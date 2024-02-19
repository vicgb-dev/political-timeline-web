/*
"id": 1,
"title": "titulo",
"description": "buah chaval lo que ha pasado",
"publishingStatus": "published",
"idTopic": null,
"idAuthor": "87953a0d-7c9f-4f81-9ccc-a8d422294600",
"eventDate": "2023-11-20T12:56:06",
"importance": 1,
"eventImg": null
*/

export interface PoliticalEvent {
    id: number
    title: string
    description: string
    publishingStatus: string
    idTopic: number | null
    idAuthor: string
    eventDate: Date
    importance: number
    eventImg: string | null
}
