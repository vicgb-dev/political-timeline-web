import { formatKeyboardShortcut } from '@blocknote/core'
import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange, useSelectedBlocks } from '@blocknote/react'
import { useCallback, useMemo, useState } from 'react'
import { RiIndentDecrease, RiIndentIncrease } from 'react-icons/ri'

export function CustomNestBlockButton () {
  const editor = useBlockNoteEditor()
  const selectedBlocks = useSelectedBlocks(editor)
  const [canNestBlock, setCanNestBlock] = useState<boolean>(() =>
    editor.canNestBlock()
  )

  useEditorContentOrSelectionChange(() => {
    setCanNestBlock(editor.canNestBlock())
  }, editor)

  const nestBlock = useCallback(() => {
    editor.focus()
    editor.nestBlock()
  }, [editor])

  const show = useMemo(() => {
    return !selectedBlocks.find(
      (block) => editor.schema.blockSchema[block.type].content !== 'inline'
    )
  }, [editor.schema.blockSchema, selectedBlocks])

  if (!show) {
    return null
  }

  return (
    <ToolbarButton
      onClick={nestBlock}
      isDisabled={!canNestBlock}
      mainTooltip="Anidar bloque"
      secondaryTooltip={formatKeyboardShortcut('Tab')}
      icon={RiIndentIncrease}
    />
  )
}

export const CustomUnnestBlockButton = () => {
  const editor = useBlockNoteEditor<any, any, any>()

  const selectedBlocks = useSelectedBlocks(editor)

  const [canUnnestBlock, setCanUnnestBlock] = useState<boolean>(() =>
    editor.canUnnestBlock()
  )

  useEditorContentOrSelectionChange(() => {
    setCanUnnestBlock(editor.canUnnestBlock())
  }, editor)

  const unnestBlock = useCallback(() => {
    editor.focus()
    editor.unnestBlock()
  }, [editor])

  const show = useMemo(() => {
    return !selectedBlocks.find(
      (block) => editor.schema.blockSchema[block.type].content !== 'inline'
    )
  }, [editor.schema.blockSchema, selectedBlocks])

  if (!show) {
    return null
  }

  return (
    <ToolbarButton
      onClick={unnestBlock}
      isDisabled={!canUnnestBlock}
      mainTooltip="Desanidar bloque"
      secondaryTooltip={formatKeyboardShortcut('Shift+Tab')}
      icon={RiIndentDecrease}
    />
  )
}
