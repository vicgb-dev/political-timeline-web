import { Link1Icon, PlusIcon } from '@radix-ui/react-icons'
import { IconButton, TextField } from '@radix-ui/themes'
import { SelectedResourceList } from './selected-resource-list'
import { AllowedTypes } from '../../types/allowed-types'
import { useState } from 'react'
import { Source } from './../../models/source.interface'
import { ToastProps, useToast } from '../../stores/toast-store'

export function SourceInputWithListen () {
  const [selectedData, setSelectedData] = useState<Source[]>([])
  const [urlInput, setUrlInput] = useState('')
  const addToast = useToast(state => state.addToast)

  function showURLNotValidToast () {
    const toast: ToastProps = {
      title: 'URL no válida',
      description: 'Asegúrate de que la URL sea válida',
      showButton: false,
      buttonText: '',
      buttonAction: () => { },
      duration: 2000
    }
    addToast(toast, true)
  }

  function getTitle (data: AllowedTypes) {
    return (data as Source).url
  }

  function getSubtitle (data: AllowedTypes) {
    return ''
  }

  function toggleData (e: any, data: AllowedTypes): void {
    e.preventDefault()

    if (selectedData.find(t => t.url === (data as Source).url)) {
      // Si el dato ya está seleccionado, lo quita
      setSelectedData(selectedData.filter(t => t.url !== (data as Source).url))
    } else {
      // Si no está seleccionado, lo agrega
      try {
        const url:URL = new URL(urlInput)
        setSelectedData([...selectedData, { id: data.id, url: url.href } as Source])
        setUrlInput('')
      } catch (err) {
        showURLNotValidToast()
      }
    }
  }

  function addURL (e: any, newSource: Source): void {
    e.preventDefault()

    if (!selectedData.find(t => t.url === newSource.url)) {
      try {
        const url:URL = new URL(newSource.url)
        setSelectedData([...selectedData, newSource])
        setUrlInput('')
      } catch (err) {
        showURLNotValidToast()
      }
    }
  }

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setUrlInput(event.target.value)
  }

  return (
    <div className='flex flex-col gap-3'>
      <label >Fuentes
        <div className='flex gap-2'>
          <TextField.Root>
            <TextField.Slot>
              <Link1Icon />
            </TextField.Slot>
            <TextField.Input
              value={urlInput}
              onChange={handleChange}
              placeholder="https://..." />
          </TextField.Root>
          <IconButton variant='outline' size='2' onClick={(e) => addURL(e, { id: Date.now() + Math.floor(Math.random() * 1000000) / 100000, url: urlInput } as Source)}>
            <PlusIcon />
          </IconButton>
        </div>
      </label>
      <SelectedResourceList props={{ selectedData, getTitle, getSubtitle, toggleData, isLink: true }} />
    </div>
  )
}
