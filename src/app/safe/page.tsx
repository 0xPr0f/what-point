'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { BLAST_TESTNETSCAN_URL, loadExternalURL } from '@/components/utils'

const tags = Array.from({ length: 20 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
/*
function Toast (tittle, disc){
  toast('Safe deployed', {
    description: 'txhash',
    action: {
      label: 'View',
      onClick: () => loadExternalURL(`${BLAST_TESTNETSCAN_URL}/tx/`),
    },
  })
}*/
function Toast({
  tittle,
  description,
  action = false,
}: {
  tittle: string
  description: string
  action?: any
}) {
  if (action) {
    toast(tittle, {
      description: description,
      action: action,
    })
  } else if (!action) {
    toast(tittle, {
      description: description,
    })
  }
}
export default function Safe() {
  function createSafe() {
    Toast({
      tittle: 'Safe deployed',
      description: 'txhash',
      action: {
        label: 'View',
        onClick: () => loadExternalURL(`${BLAST_TESTNETSCAN_URL}/tx/`),
      },
    })
  }

  const [safeName, setSafeName] = useState<string>()
  return (
    <>
      <div className="flex flex-col gap-8 mt-20">
        <div className="flex w-[350px] items-center space-x-1">
          <Input type="email" placeholder="Safe address..." />
          <Button variant="secondary" type="submit">
            S
          </Button>
        </div>
        <Card
          style={{ backgroundColor: '#1c1c1c', color: 'white' }}
          className="w-[350px]"
        >
          <CardHeader>
            <CardTitle color="white">Create test Safe</CardTitle>
            <CardDescription>
              Deploy your safe contract with one click
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    value={safeName}
                    onChange={(e) => {
                      setSafeName(e.target.value)
                    }}
                    id="name"
                    placeholder="Name of your safe"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-end">
            <Button onClick={createSafe} variant="secondary">
              Deploy
            </Button>
          </CardFooter>
        </Card>

        <ScrollArea className="h-72 w-[350px] rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">
              Deployed safes
            </h4>
            {tags.map((tag) => (
              <div key={tag}>
                <div className="flex justify-between align-middle">
                  <Button variant="editedlink" className="text-sm">
                    {tag}
                  </Button>
                  <Button size="sm" variant="outline">
                    Nav
                  </Button>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
