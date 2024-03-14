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
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'

export default function Points() {
  const account = useAccount()
  const cookies = useCookies()
  const router = useRouter()
  const { signMessage } = useSignMessage()
  const [pointContract, setPointsContract] = useState<{
    contract_address: string
    acceptedTOS: boolean
  }>({ contract_address: '', acceptedTOS: false })
  function Toast({
    tittle,
    description,
    action,
  }: {
    tittle: string
    description: string
    action?: any
  }) {
    if (action) {
      toast(tittle, {
        description: description,
        action: action,
        /* action: {
          label: 'View',
          onClick: () => console.log('go to etherscan'),
        }, */
      })
    } else if (!action) {
      toast(tittle, {
        description: description,
      })
    }
  }

  const dappauth = async (contractaddress: string) => {
    console.log(pointContract)
    const { contract_address, acceptedTOS } = pointContract
    if (!contract_address || !acceptedTOS || !(contract_address.length === 42))
      return Toast({
        tittle: 'Configure all params',
        description:
          'Make sure the contract address is correct and you have accepted TOS',
      })

    const challengeinfo = await dappAuthChallenge(
      contractaddress,
      account.address as string
    )
    signMessage(
      { message: challengeinfo?.message as string },
      {
        onSuccess(data) {
          dappAuthSolve(challengeinfo?.challengeData as string, data).then(
            (d) => {
              cookies.set(
                'points-bearer-token',
                btoa(d?.bearerToken as string),
                {
                  expires: new Date().getTime() + 1 * 60 * 60 * 1000,
                  secure: true,
                }
              )
              router.push(`/point/${pointContract.contract_address}`)
              console.log(d)
            }
          )
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
                  <Input
                    value={pointContract.contract_address}
                    onChange={(e) => {
                      const re = /(?:0[xX])?[0-9a-fA-F]+/
                      if (e.target.value === '' || re.test(e.target.value)) {
                        setPointsContract({
                          contract_address: e.target.value,
                          acceptedTOS: pointContract.acceptedTOS,
                        })
                      }
                    }}
                    id="name"
                    placeholder="contract address..."
                  />
                </div>
              </div>
            </form>
            <div className="items-top flex mt-10 space-x-2">
              <Checkbox
                style={{ backgroundColor: 'white', color: 'black' }}
                checked={pointContract.acceptedTOS}
                onCheckedChange={(e) => {
                  setPointsContract({
                    contract_address: pointContract.contract_address,
                    acceptedTOS: e as boolean,
                  })
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
                await dappauth(pointContract.contract_address)
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
