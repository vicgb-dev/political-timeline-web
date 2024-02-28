import { Button, Dialog, Flex, TextField, Text } from '@radix-ui/themes'
import React, { useState } from 'react'

export function LoginDialog ({ children }: {children: React.ReactNode}) {
  const [open, setOpen] = useState(false)

  const submitForm = () => {
    setOpen(false)
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen} >
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
      Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
          Name
            </Text>
            <TextField.Input
              defaultValue="Freja Johnsen"
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
          Email
            </Text>
            <TextField.Input
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
          Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={submitForm}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
