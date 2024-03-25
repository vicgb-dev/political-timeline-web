import { formatKeyboardShortcut } from '@blocknote/core'
import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react'
import { useState } from 'react'
import { RiStrikethrough } from 'react-icons/ri'

export function StrikelineTextStyleButton () {
  const editor = useBlockNoteEditor()
  const [isSelected, setIsSelected] = useState<boolean>(editor.getActiveStyles().strike ?? false)

  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().strike ?? false
    )
  }, editor)

  return (
    <ToolbarButton
      mainTooltip={'Tachado'}
      secondaryTooltip={formatKeyboardShortcut('Ctrl+Shift+X')}
      onClick={() => {
        editor.toggleStyles({
          strike: !isSelected
        })
      }}
      isSelected={isSelected}
      icon={RiStrikethrough}>
    </ToolbarButton>
  )
}
