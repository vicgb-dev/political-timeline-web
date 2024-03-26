import { BlockNoteEditor, PartialBlock, insertOrUpdateBlock } from '@blocknote/core'
import { DefaultReactSuggestionItem } from '@blocknote/react'
import { PilcrowIcon, TextIcon } from '@radix-ui/react-icons'
import { RiListOrdered, RiListUnordered } from 'react-icons/ri'
import { schema } from '../custom-blocknote'

const paragraphItem = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Párrafo',
  onItemClick: () => {
    const pBlock: PartialBlock = {
      type: 'paragraph'
    }

    insertOrUpdateBlock(editor, pBlock)
  },
  aliases: ['p', 'párrafo', 'paragraph', 'parrafo'],
  group: 'Párrafos',
  icon: <PilcrowIcon />,
  subtext: 'Inserta un título grande'
})

const h1Item = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Título H1',
  onItemClick: () => {
    const h1Block: PartialBlock = {
      type: 'heading',
      props: { level: 1 }
    }

    insertOrUpdateBlock(editor, h1Block)
  },
  aliases: ['h1', 'titulo', 'título', 'heading1'],
  group: 'Títulos',
  icon: <TextIcon />,
  subtext: 'Inserta un título grande'
})

const h2Item = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Título H2',
  onItemClick: () => {
    const h2Block: PartialBlock = {
      type: 'heading',
      props: { level: 2 }
    }

    insertOrUpdateBlock(editor, h2Block)
  },
  aliases: ['h2', 'titulo', 'título', 'subtitulo', 'subtítulo', 'heading2'],
  group: 'Títulos',
  icon: <TextIcon />,
  subtext: 'Inserta un título mediano'
})

const h3Item = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Título H3',
  onItemClick: () => {
    const h3Block: PartialBlock = {
      type: 'heading',
      props: { level: 3 }
    }

    insertOrUpdateBlock(editor, h3Block)
  },
  aliases: ['h3', 'titulo', 'título', 'subtitulo', 'subtítulo', 'heading3'],
  group: 'Títulos',
  icon: <TextIcon />,
  subtext: 'Inserta un título pequeño'
})

const listItem = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Lista',
  onItemClick: () => {
    const numListBlock: PartialBlock = {
      type: 'bulletListItem'
    }

    insertOrUpdateBlock(editor, numListBlock)
  },
  aliases: ['lista', 'enumerar', 'bulletlist'],
  group: 'Listas',
  icon: <RiListUnordered />,
  subtext: 'Inserta una lista'
})

const numListItem = (editor: BlockNoteEditor): DefaultReactSuggestionItem => ({
  title: 'Lista enumerada',
  onItemClick: () => {
    const numListBlock: PartialBlock = {
      type: 'numberedListItem'
    }

    insertOrUpdateBlock(editor, numListBlock)
  },
  aliases: ['lista', 'enumerar', 'numero', 'numberedlist'],
  group: 'Listas',
  icon: <RiListOrdered />,
  subtext: 'Inserta una lista enumerada'
})

export const getCustomSlashMenuItems = (editor: BlockNoteEditor | typeof schema.BlockNoteEditor): DefaultReactSuggestionItem[] => [
  // ...getDefaultReactSlashMenuItems(editor),
  paragraphItem(editor as BlockNoteEditor),
  h1Item(editor as BlockNoteEditor),
  h2Item(editor as BlockNoteEditor),
  h3Item(editor as BlockNoteEditor),
  listItem(editor as BlockNoteEditor),
  numListItem(editor as BlockNoteEditor)
]
