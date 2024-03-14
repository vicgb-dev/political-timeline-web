import { Group } from '../models/group.interface'
import { PoliticalEvent } from '../models/political-event.interface'
import { PublicFigure } from '../models/public-figure.interface'
import { Source } from '../models/source.interface'
import { Topic } from '../models/topic.interface'

// Cada tipo permitido debe tener un id
export type AllowedTypes = Topic | PoliticalEvent | Group | PublicFigure | Source

export enum AllowedTypesEnum {
  Topic = 'Topic',
  PoliticalEvent = 'PoliticalEvent',
  Group = 'Group',
  PublicFigure = 'PublicFigure',
  Source = 'Source'
}
