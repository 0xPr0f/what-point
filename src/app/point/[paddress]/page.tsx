'use client'

import { Button } from '@/components/ui/button'
import { useCookies } from 'next-client-cookies'
import React, { useEffect, useState } from 'react'
import { pointBalance } from '../api'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BalanceResponse } from '../types'

export default function Point({ params }: { params: { paddress: string } }) {
  const cookies = useCookies()
  const address = params.paddress
  const [correctAddressOpen, setCorrectAddressOpen] = useState()
  const deleteCookies = () => {
    cookies.remove('points-bearer-token')
  }
  const [bearerToken, setBearerToken] = useState<string>(
    cookies.get('points-bearer-token')
      ? atob(cookies.get('points-bearer-token') as string)
      : ''
  )

  const [points, setPoints] = useState<BalanceResponse>()
  const fetchPointBalance = async () => {
    const response = await pointBalance(address, bearerToken)
    setPoints(response)
    console.log(response)
  }

  useEffect(() => {
    console.log(params.paddress)
    console.log(bearerToken)
  }, [])
  return (
    <div>
      <div className="relative float-right	">
        <Button variant="default" onClick={fetchPointBalance}>
          Refresh
        </Button>
      </div>
      <Tabs defaultValue="liquidity" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          <TabsTrigger value="developer">Developer</TabsTrigger>
        </TabsList>
        <TabsContent value="liquidity">
          <Card>
            <CardHeader>
              <CardTitle>Liquidity</CardTitle>
              <CardDescription>
                This shows points gotten from the assets in the contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <TextSpan
                  lhs="available:"
                  rhs={points?.balancesByPointType.LIQUIDITY.available}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="earnedCumulative:"
                  rhs={points?.balancesByPointType.LIQUIDITY.earnedCumulative}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="finalizedSentCumulative:"
                  rhs={
                    points?.balancesByPointType.LIQUIDITY
                      .finalizedSentCumulative
                  }
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="pendingSent:"
                  rhs={points?.balancesByPointType.LIQUIDITY.pendingSent}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="receivedCumulative:"
                  rhs={points?.balancesByPointType.LIQUIDITY.receivedCumulative}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle>Developer [Blast Gold]</CardTitle>
              <CardDescription>
                This shows points rewarded to you from the Blast core
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <TextSpan
                  lhs="available:"
                  rhs={points?.balancesByPointType.DEVELOPER.available}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="earnedCumulative:"
                  rhs={points?.balancesByPointType.DEVELOPER.earnedCumulative}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="finalizedSentCumulative:"
                  rhs={
                    points?.balancesByPointType.DEVELOPER
                      .finalizedSentCumulative
                  }
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="pendingSent:"
                  rhs={points?.balancesByPointType.DEVELOPER.pendingSent}
                />
              </div>
              <div className="space-y-1">
                <TextSpan
                  lhs="receivedCumulative:"
                  rhs={points?.balancesByPointType.DEVELOPER.receivedCumulative}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
export function TextSpan({
  lhs,
  rhs,
}: Readonly<{
  lhs?: React.ReactNode
  rhs?: React.ReactNode
}>) {
  return (
    <div className="flex flex-row text-base items-center gap-1">
      <span className="font-semibold">{lhs}</span>
      <span className="font-light">{rhs}</span>
    </div>
  )
}
