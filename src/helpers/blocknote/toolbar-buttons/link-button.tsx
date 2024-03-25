// import { BlockNoteEditor, BlockSchema, StyleSchema } from '@blocknote/core'
// import { useBlockNoteEditor, useEditorContentOrSelectionChange, useSelectedBlocks } from '@blocknote/react'
// import { useCallback, useMemo, useState } from 'react'

// function checkLinkInSchema (
//   editor: BlockNoteEditor<BlockSchema, any, StyleSchema>
// ): editor is BlockNoteEditor<
//   BlockSchema,
//   {
//     link: {
//       type: 'link';
//       propSchema: any;
//       content: 'styled';
//     };
//   },
//   StyleSchema
// > {
//   return (
//     'link' in editor.schema.inlineContentSchema &&
//     editor.schema.inlineContentSchema.link === 'link'
//   )
// }

// export const CustomCreateLinkButton = () => {
//   const editor = useBlockNoteEditor()

//   const linkInSchema = checkLinkInSchema(editor)

//   const selectedBlocks = useSelectedBlocks(editor)

//   const [url, setUrl] = useState<string>(editor.getSelectedLinkUrl() || '')
//   const [text, setText] = useState<string>(editor.getSelectedText())

//   useEditorContentOrSelectionChange(() => {
//     setText(editor.getSelectedText() || '')
//     setUrl(editor.getSelectedLinkUrl() || '')
//   }, editor)

//   const update = useCallback(
//     (url: string, text: string) => {
//       editor.createLink(url, text)
//       editor.focus()
//     },
//     [editor]
//   )

//   const show = useMemo(() => {
//     if (!linkInSchema) {
//       return false
//     }

//     for (const block of selectedBlocks) {
//       if (block.content === undefined) {
//         return false
//       }
//     }

//     return true
//   }, [linkInSchema, selectedBlocks])

//   if (!show) {
//     return null
//   }

//   return (
//     <ToolbarInputsMenu
//       button={
//         <ToolbarButton
//           mainTooltip={'Create Link'}
//           secondaryTooltip={formatKeyboardShortcut('Mod+K')}
//           icon={RiLink}
//         />
//       }
//       dropdownItems={
//         <EditLinkMenuItems url={url} text={text} editLink={update} />
//       }
//     />
//   )
// }
