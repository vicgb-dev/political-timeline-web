import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { IconButton, TextField } from '@radix-ui/themes'
import { ToastProps, useToast } from '../../stores/toast-store'
import { notImplementedToastProps } from '../../constants/mocks/not-implemented-toast'

export function SearchBar () {
  const addToast = useToast(state => state.addToast)

  function handleClick () {
    const toast: ToastProps = notImplementedToastProps
    addToast(toast, true)
  }

  return (
    <TextField.Root className='flex-grow' >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="@Figura pública, #tag, t[tema]..." size="3"/>
      <TextField.Slot pr="3">
        <IconButton size="2" variant="ghost" onClick={handleClick}>
          <MixerHorizontalIcon height="16" width="16" />
        </IconButton>
      </TextField.Slot>
    </TextField.Root>
  )
}
