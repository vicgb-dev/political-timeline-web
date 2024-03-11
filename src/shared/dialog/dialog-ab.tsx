import { Button, Dialog, Flex } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'

export interface DialogABProps{
    title: string
    description: string
    btnGrayText: string
    btnGrayAction: () => void,
    btnColorText: string
    btnColorAction: ()=>void,
}

// export function DialogAB ({ btnAText, btnAAction, btnBText, btnBAction, children }: React.PropsWithChildren<DialogABProps>) {
export function DialogAB ({ children, props }: {children: React.ReactNode, props: DialogABProps}) {
  const [open, setOpen] = useState(false)
  const [closeBlocked, setCloseBlocked] = useState(false)

  useEffect(() => {
    if (open) setCloseBlocked(true)
    else setCloseBlocked(false)
  }, [open])

  function onOpenChange (open: boolean) {
    if (closeBlocked) return
    setOpen(open)
  }

  const handleClickA = () => {
    setOpen(false)
    props.btnGrayAction()
  }

  const handleClickB = () => {
    setOpen(false)
    props.btnColorAction()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>

      <Dialog.Content className='flex flex-col items-center gap-5 text-pretty'>
        <Dialog.Title align='center' size='7'>{props.title}</Dialog.Title>
        <Dialog.Description size='3' align='center' className='text-pretty'>{props.description}</Dialog.Description>
        <Flex justify='center' gap='2'>
          <Button variant='soft' color='gray' size='2' onClick={handleClickA}>{props.btnGrayText}</Button>
          <Button variant='outline' size='2' onClick={handleClickB}>{props.btnColorText}</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
