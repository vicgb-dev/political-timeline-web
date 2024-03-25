import { formatKeyboardShortcut } from '@blocknote/core'
import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react'
import { useState } from 'react'
import { boldIcon } from '../../../constants/icons/blocknote-toolbar-icons'

export function BoldTextStyleButton () {
  const editor = useBlockNoteEditor()
  const [isSelected, setIsSelected] = useState<boolean>(editor.getActiveStyles().bold ?? false)

  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().bold ?? false
    )
  }, editor)

  return (
    <ToolbarButton
      mainTooltip={'Negrita'}
      secondaryTooltip={formatKeyboardShortcut('Ctrl+B')}
      onClick={() => {
        editor.toggleStyles({
          bold: !isSelected
        })
      }}
      isSelected={isSelected}
      icon={boldIcon}>
    </ToolbarButton>
  )
}
