import { MagnifyingGlassIcon, TrashIcon, TriangleDownIcon } from '@radix-ui/react-icons'
import { ScrollArea, TextField, Text, Button, Checkbox, Popover, IconButton, RadioGroup } from '@radix-ui/themes'
import { TopicService } from '../../services/topic-service'
import { useState } from 'react'
import { Topic } from '../../models/topic.interface'
import './combo-select.css'
import { PoliticalEvent } from '../../models/political-event.interface'
import { Group } from '../../models/group.interface'
import { EventsService } from '../../services/events-service'
import { GroupServices } from '../../services/group-services'
import { PublicFigure } from '../../models/public-figure.interface'
import { PublicFigureService } from '../../services/public-figure-service'
import { AllowedTypes, AllowedTypesEnum } from '../../types/allowed-types'
import { SelectedResourceList } from './selected-resource-list'
import { LoadedResourceList } from './loaded-resource-list'
import { Source } from '../../models/source.interface'

export interface ComboSelectProps {
  type: AllowedTypesEnum
  multiSelect: boolean
  buttonTitle: string
}

export function ComboSelect<T extends AllowedTypes> ({ props }: { props: ComboSelectProps }) {
  const [loadedData, setLoadedData] = useState<AllowedTypes[] | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedData, setSelectedData] = useState<AllowedTypes[]>([])
  const [loading, setLoading] = useState(false)

  async function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value)

    if (event.target.value.length > 1) {
      // Pedir temas que contengan esas letras
      console.log('Pedir temas que contengan esas letras')

      setLoading(true)

      switch (props.type) {
      case 'Topic':{
        const foundTopics = await TopicService.getTopicsByTitle(event.target.value)
        setLoadedData(foundTopics as T[])
      }
        break
      case 'PoliticalEvent': {
        const foundPoliticalEvent = await EventsService.searchEventsWithQuery(event.target.value)
        setLoadedData(foundPoliticalEvent as T[])
      }
        break
      case 'Group':{
        const foundGroup = await GroupServices.getGroupsByName(event.target.value)
        setLoadedData(foundGroup as T[])
      }
        break
      case 'PublicFigure':{
        const foundGroup = await PublicFigureService.getPublicFiguresByName(event.target.value)
        setLoadedData(foundGroup as T[])
      }
      }

      setLoading(false)
    }
  }

  function toggleData (e: any, data: AllowedTypes) {
    e.preventDefault()
    if (props.multiSelect) {
      if (selectedData.find(t => t.id === data.id)) {
        setSelectedData(selectedData.filter(t => t.id !== data.id))
      } else {
        setSelectedData([...selectedData as T[], data as T])
      }
    } else {
      if (selectedData.find(t => t.id === data.id)) {
        setSelectedData([])
      } else {
        setSelectedData([data])
      }
    }
  }

  function getTitle (data: AllowedTypes): string {
    switch (props.type) {
    case AllowedTypesEnum.Topic:
      return (data as Topic).title
    case AllowedTypesEnum.PoliticalEvent:
      return (data as PoliticalEvent).title
    case AllowedTypesEnum.Group:
      return (data as Group).name
    case AllowedTypesEnum.PublicFigure:
      return (data as PublicFigure).first_name
    case AllowedTypesEnum.Source:
      return (data as Source).url
    }
  }

  function getSubtitle (data: AllowedTypes): string {
    switch (props.type) {
    case AllowedTypesEnum.Topic:
      return (data as Topic).article
    case AllowedTypesEnum.PoliticalEvent:
      return (data as PoliticalEvent).summary
    case AllowedTypesEnum.Group:
      return (data as Group).acronym
    case AllowedTypesEnum.PublicFigure:
      return (data as PublicFigure).last_name
    case AllowedTypesEnum.Source:
      return ''
    }
  }

  return (
    <div className={`${selectedData.length > 0 ? 'px-2 py-2' : ''}`}>
      {(selectedData.length === 0 || true) &&
      <Popover.Root>
        <Popover.Trigger>
          <Button
            className='relative'
            highContrast={selectedData.length > 0}
            variant={`${selectedData.length > 0 ? 'ghost' : 'outline'}`}>
            <Text>{props.buttonTitle}</Text>
            <TriangleDownIcon />
          </Button>
        </Popover.Trigger>

        <Popover.Content className=''>
          <TextField.Root >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input onChange={handleChange} placeholder="Tema del evento..." />
            {loading && <div className='loading-bar'/>}
          </TextField.Root>
          <ScrollArea scrollbars='vertical'>
            <LoadedResourceList props={{ loadedData, selectedData, multiSelect: props.multiSelect, getTitle, getSubtitle, toggleData }} />
          </ScrollArea>
        </Popover.Content>
      </Popover.Root>}

      {selectedData.length > 0 &&
        <SelectedResourceList props={{ selectedData, getTitle, getSubtitle, toggleData }} />
      }
    </div>
  )
}
