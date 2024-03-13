'use client'
import { Button } from '@/components/ui/button'
import { dappAuthChallenge, dappAuthSolve } from './api'
import { useAccount } from 'wagmi'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useSignMessage } from 'wagmi'
import { useState } from 'react'

export default function Points() {
  const account = useAccount()
  const { signMessage } = useSignMessage()
  const [pointContract, setPointsContract] = useState<{
    contract_address: string
    acceptedTOS: string
  }>({ contract_address: '', acceptedTOS: '' })

  const dappauth = async (contractaddress: string) => {
    const challengeinfo = await dappAuthChallenge(
      contractaddress,
      account.address as string
    )
    signMessage(
      { message: challengeinfo.message },
      {
        onSuccess(data) {
          dappAuthSolve(challengeinfo.challengeData, data).then((d) => {
            // store the cookies and the probably redirect the user to the address page that will retrive the cookies
            console.log(d)
          })
        },
      }
    )
  }
  return (
    <>
      <div className="flex flex-col gap-5 align-middle">
        <div>
          <span>Manage points for your contracts</span>
        </div>
        <Card
          style={{ backgroundColor: '#1c1c1c', color: 'white' }}
          className="w-[350px]"
        >
          <CardHeader>
            <CardTitle color="white">Authenticate contract</CardTitle>
            <CardDescription>
              Start authentication for contract points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Contract address</Label>
                  <Input id="name" placeholder="contract address..." />
                </div>
              </div>
            </form>
            <div className="items-top flex mt-10 space-x-2">
              <Checkbox
                onChange={() => {
                  console.log('checked')
                }}
                id="terms1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contract is properly configured
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree that the connected EOA is the points operator for
                  the inputed contract address
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button
              onClick={async () => {
                await dappauth('0xa2C6C353B9Bd02106Da1ff080911ab5137aF2224')
              }}
              variant="secondary"
            >
              Authenticate
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
