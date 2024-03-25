import { formatKeyboardShortcut } from '@blocknote/core'
import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react'
import { useState } from 'react'
import { underlinelineIcon } from '../../../constants/icons/blocknote-toolbar-icons'

export function UnderlineTextStyleButton () {
  const editor = useBlockNoteEditor()
  const [isSelected, setIsSelected] = useState<boolean>(editor.getActiveStyles().underline ?? false)

  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().underline ?? false
    )
  }, editor)

  return (
    <ToolbarButton
      mainTooltip={'Subrayado'}
      secondaryTooltip={formatKeyboardShortcut('Ctrl+U')}
      onClick={() => {
        editor.toggleStyles({
          underline: !isSelected
        })
      }}
      isSelected={isSelected}
      icon={underlinelineIcon}>
    </ToolbarButton>
  )
}
