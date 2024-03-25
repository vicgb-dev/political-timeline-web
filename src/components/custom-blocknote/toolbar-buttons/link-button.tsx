import { BlockNoteEditor, BlockSchema, InlineContentSchema, StyleSchema, formatKeyboardShortcut } from '@blocknote/core'
import { LinkToolbarProps, ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange, useSelectedBlocks } from '@blocknote/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { ToolbarInputsMenu } from '../Toolbar/ToolbarInputsMenu'
import { RiLink, RiText } from 'react-icons/ri'
import { ToolbarInputsMenuItem } from '../Toolbar/ToolbarInputsMenuItem'

function checkLinkInSchema (
  editor: BlockNoteEditor<BlockSchema, any, StyleSchema>
): editor is BlockNoteEditor<
  BlockSchema,
  {
    link: {
      type: 'link';
      propSchema: any;
      content: 'styled';
    };
  },
  StyleSchema
> {
  return (
    'link' in editor.schema.inlineContentSchema &&
    editor.schema.inlineContentSchema.link === 'link'
  )
}

export const CustomCreateLinkButton = () => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >()

  const linkInSchema = checkLinkInSchema(editor)

  const selectedBlocks = useSelectedBlocks(editor)

  const [url, setUrl] = useState<string>(editor.getSelectedLinkUrl() || '')
  const [text, setText] = useState<string>(editor.getSelectedText())

  useEditorContentOrSelectionChange(() => {
    setText(editor.getSelectedText() || '')
    setUrl(editor.getSelectedLinkUrl() || '')
  }, editor)

  const update = useCallback(
    (url: string, text: string) => {
      editor.createLink(url, text)
      editor.focus()
    },
    [editor]
  )

  const show = useMemo(() => {
    if (!linkInSchema) {
      return false
    }

    for (const block of selectedBlocks) {
      if (block.content === undefined) {
        return false
      }
    }

    return true
  }, [linkInSchema, selectedBlocks])

  if (!show) {
    return null
  }

  return (
    <ToolbarInputsMenu
      button={
        <ToolbarButton
          mainTooltip={'Crear enlace'}
          secondaryTooltip={formatKeyboardShortcut('Mod+K')}
          icon={RiLink}
        />
      }
      dropdownItems={
        <CustomEditLinkMenuItems url={url} text={text} editLink={update} />
      }
    />
  )
}

export const CustomEditLinkMenuItems = (
  props: Pick<LinkToolbarProps, 'url' | 'text' | 'editLink'>
) => {
  const { url, text, editLink } = props

  const [currentUrl, setCurrentUrl] = useState<string>(url)
  const [currentText, setCurrentText] = useState<string>(text)

  useEffect(() => {
    setCurrentUrl(url)
    setCurrentText(text)
  }, [text, url])

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        editLink(currentUrl, currentText)
      }
    },
    [editLink, currentUrl, currentText]
  )

  const handleUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setCurrentUrl(event.currentTarget.value),
    []
  )

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setCurrentText(event.currentTarget.value),
    []
  )

  const handleSubmit = useCallback(
    () => editLink(currentUrl, currentText),
    [editLink, currentUrl, currentText]
  )

  return (
    <>
      <ToolbarInputsMenuItem
        type={'text'}
        icon={RiLink}
        autoFocus={true}
        placeholder={'Editar URL'}
        value={currentUrl}
        onKeyDown={handleEnter}
        onChange={handleUrlChange}
        onSubmit={handleSubmit}
      />
      <ToolbarInputsMenuItem
        type={'text'}
        icon={RiText}
        placeholder={'Editar texto'}
        value={currentText}
        onKeyDown={handleEnter}
        onChange={handleTextChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}
