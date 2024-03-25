import { Button, Menu } from '@mantine/core'
import { ToolbarSelectItem, ToolbarSelectItemProps } from './ToolbarSelectItem'
import { isSafari } from '@blocknote/core'
import { HiChevronDown } from 'react-icons/hi'
import { useRef } from 'react'

export type ToolbarSelectProps = {
  items: ToolbarSelectItemProps[];
  isDisabled?: boolean;
};

export function ToolbarSelect (props: ToolbarSelectProps) {
  const selectedItem = props.items.filter((p) => p.isSelected)[0]

  const { ref, updateMaxHeight } = usePreventMenuOverflow()

  if (!selectedItem) {
    return null
  }

  const Icon = selectedItem.icon

  return (
    <Menu
      withinPortal={false}
      transitionProps={{
        exitDuration: 0
      }}
      disabled={props.isDisabled}
      onOpen={updateMaxHeight}>
      <Menu.Target>
        <Button
          // Needed as Safari doesn't focus button elements on mouse down
          // unlike other browsers.
          onMouseDown={(e) => {
            if (isSafari()) {
              (e.currentTarget as HTMLButtonElement).focus()
            }
          }}
          leftSection={Icon && <Icon size={16} />}
          rightSection={<HiChevronDown />}
          size={'xs'}
          variant={'subtle'}
          disabled={props.isDisabled}>
          {selectedItem.text}
        </Button>
      </Menu.Target>
      <div ref={ref}>
        <Menu.Dropdown>
          {props.items.map((item) => (
            <ToolbarSelectItem key={item.text} {...item} />
          ))}
        </Menu.Dropdown>
      </div>
    </Menu>
  )
}

export function usePreventMenuOverflow () {
  const ref = useRef<HTMLDivElement>(null)

  return {
    ref,
    updateMaxHeight: () => {
      // Seems a small delay is necessary to get the correct DOM rect - likely
      // because the menu is not yet fully rendered when the `onOpen` event is
      // fired.
      setTimeout(() => {
        if (!ref.current) {
          return
        }

        if (ref.current.childElementCount > 0) {
          // Reset any previously set max-height
          (ref.current.firstElementChild as HTMLDivElement).style.maxHeight =
            'none'

          // Get the menu DOM rect
          const domRect =
            ref.current.firstElementChild!.getBoundingClientRect();

          // Set the menu max height, based on the element position. Checking if
          // the top of the menu is above the viewport (position < 0) is a quick
          // way to check if the placement is "top" or "bottom".
          (
            ref.current.firstElementChild as HTMLDivElement
          ).style.maxHeight = `${Math.min(
            domRect.top >= 0
              ? window.innerHeight - domRect.top - 20
              : domRect.bottom - 20
          )}px`
        }
      }, 10)
    }
  }
}
