import { EditLinkMenuItems, LinkToolbarProps, OpenLinkButton, ToolbarButton } from '@blocknote/react'
import { ReactNode } from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import { ToolbarInputsMenu } from '../Toolbar/ToolbarInputsMenu'
import { RiExternalLinkFill, RiLinkUnlink } from 'react-icons/ri'

export const CustomLinkToolbar = (
  props: LinkToolbarProps & { children?: ReactNode }
) => {
  if (props.children) {
    return <Toolbar>{props.children}</Toolbar>
  }

  return (
    <Toolbar
      onMouseEnter={props.stopHideTimer}
      onMouseLeave={props.startHideTimer}>
      <CustomEditLinkButton
        url={props.url}
        text={props.text}
        editLink={props.editLink}
      />
      <CustomOpenLinkButton url={props.url} />
      <CustomDeleteLinkButton deleteLink={props.deleteLink} />
    </Toolbar>
  )
}

export const CustomEditLinkButton = (
  props: Pick<LinkToolbarProps, 'url' | 'text' | 'editLink'>
) => (
  <ToolbarInputsMenu
    button={
      <ToolbarButton mainTooltip="Editar" isSelected={false}>
        Editar enlace
      </ToolbarButton>
    }
    dropdownItems={<EditLinkMenuItems {...props} />}
  />
)

export const CustomOpenLinkButton = (props: Pick<LinkToolbarProps, 'url'>) => (
  <ToolbarButton
    mainTooltip="Abrir enlace en una nueva pestaña"
    isSelected={false}
    onClick={() => {
      window.open(props.url, '_blank')
    }}
    icon={RiExternalLinkFill}
  />
)

export const CustomDeleteLinkButton = (
  props: Pick<LinkToolbarProps, 'deleteLink'>
) => (
  <ToolbarButton
    mainTooltip="Quitar enlace"
    isSelected={false}
    onClick={props.deleteLink}
    icon={RiLinkUnlink}
  />
)
