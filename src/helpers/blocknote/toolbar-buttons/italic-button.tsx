import { formatKeyboardShortcut } from '@blocknote/core'
import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react'
import { useState } from 'react'
import { italicIcon } from '../../../constants/icons/blocknote-toolbar-icons'

export function ItalicTextStyleButton () {
  const editor = useBlockNoteEditor()
  const [isSelected, setIsSelected] = useState<boolean>(editor.getActiveStyles().italic ?? false)

  useEditorContentOrSelectionChange(() => {
    setIsSelected(
      editor.getActiveStyles().italic ?? false
    )
  }, editor)

  return (
    <ToolbarButton
      mainTooltip={'Cursiva'}
      secondaryTooltip={formatKeyboardShortcut('Ctrl+I')}
      onClick={() => {
        editor.toggleStyles({
          italic: !isSelected
        })
      }}
      isSelected={isSelected}
      icon={italicIcon}>
    </ToolbarButton>
  )
}
