import { ActionIcon, Button, Tooltip, Stack, Text } from '@mantine/core'
import { MouseEvent, forwardRef } from 'react'
import type { IconType } from 'react-icons'
import { isSafari } from '@blocknote/core'

export type ToolbarButtonProps = {
  onClick?: (e: MouseEvent) => void;
  icon?: IconType;
  mainTooltip: string;
  secondaryTooltip?: string;
  isSelected?: boolean;
  children?: any;
  isDisabled?: boolean;
};

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton (props, ref) {
    const ButtonIcon = props.icon

    return (
      <Tooltip
        withinPortal={false}
        label={
          <TooltipContent
            mainTooltip={props.mainTooltip}
            secondaryTooltip={props.secondaryTooltip}
          />
        }>
        {/* Creates an ActionIcon instead of a Button if only an icon is provided as content. */}
        {props.children
          ? <Button
            // Needed as Safari doesn't focus button elements on mouse down
            // unlike other browsers.
            onMouseDown={(e) => {
              if (isSafari()) {
                (e.currentTarget as HTMLButtonElement).focus()
              }
            }}
            onClick={props.onClick}
            data-selected={props.isSelected ? 'true' : undefined}
            data-test={
              props.mainTooltip.slice(0, 1).toLowerCase() +
              props.mainTooltip.replace(/\s+/g, '').slice(1)
            }
            size={'xs'}
            disabled={props.isDisabled || false}
            ref={ref}>
            {ButtonIcon && <ButtonIcon />}
            {props.children}
          </Button>
          : <ActionIcon
            // Needed as Safari doesn't focus button elements on mouse down
            // unlike other browsers.
            onMouseDown={(e) => {
              if (isSafari()) {
                (e.currentTarget as HTMLButtonElement).focus()
              }
            }}
            onClick={props.onClick}
            data-selected={props.isSelected ? 'true' : undefined}
            data-test={
              props.mainTooltip.slice(0, 1).toLowerCase() +
              props.mainTooltip.replace(/\s+/g, '').slice(1)
            }
            size={30}
            disabled={props.isDisabled || false}
            ref={ref}>
            {ButtonIcon && <ButtonIcon />}
          </ActionIcon>
        }
      </Tooltip>
    )
  }
)

export const TooltipContent = (props: {
  mainTooltip: string;
  secondaryTooltip?: string;
}) => (
  <Stack gap={0} className={'bn-tooltip'}>
    <Text size={'sm'}>{props.mainTooltip}</Text>
    {props.secondaryTooltip && (
      <Text size={'xs'}>{props.secondaryTooltip}</Text>
    )}
  </Stack>
)
