'use client'

import { Button } from '@/components/ui/button'
import { useCookies } from 'next-client-cookies'
import React, { useEffect, useState } from 'react'
import { isError, pointBalance } from '../api'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BalanceResponse } from '../types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useChainId } from 'wagmi'
import { DEFAULT_CHAIN_ID } from '@/components/utils'

export default function Point({ params }: { params: { paddress: string } }) {
  const cookies = useCookies()
  const contractAddress = params.paddress
  const router = useRouter()
  const chainId = useChainId()
  const [correctAddressOpen, setCorrectAddressOpen] = useState()
  const deleteCookies = () => {
    cookies.remove('points-bearer-token')
  }
  const [bearerToken, setBearerToken] = useState<string>(
    cookies.get('points-bearer-token')
      ? atob(cookies.get('points-bearer-token') as string)
      : ''
  )
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
  const [points, setPoints] = useState<BalanceResponse>()
  const fetchPointBalance = async () => {
    const response = await pointBalance(
      contractAddress,
      bearerToken,
      chainId ? chainId.toString() : DEFAULT_CHAIN_ID
    )
    if (response.status === 401 || response.statusText === 'Unauthorized') {
      return Toast({
        tittle: 'Auth Key expired',
        description: 'Duration of 1hr exceeded auth again',
        action: {
          label: 'Auth',
          onClick: () => router.push('/point'),
        },
      })
    } else if (isError(response)) {
      return Toast({
        tittle: 'No Bearer Token Auth',
        description:
          'Bearer Token not found, allow cookies on this site and auth again',
        action: {
          label: 'Auth',
          onClick: () => router.push('/point'),
        },
      })
    }
    setPoints(response)
    //console.log(response)
  }

  useEffect(() => {
    fetchPointBalance()
    console.log(1)
  }, [])
  function TextSpan({
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
  return (
    <div className="mt-14">
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
          <Card style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '20px' }}>Liquidity</CardTitle>
              <CardDescription>
                This shows points gotten from the assets in the contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <TextSpan
                  lhs="available:"
                  rhs={points?.balancesByPointType.LIQUIDITY.available}
                />
              </div>
              <div>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base">
                      ETH
                    </AccordionTrigger>
                    <AccordionContent>
                      <TextSpan
                        lhs="earnedCumulative:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.ETH
                            .earnedCumulative
                        }
                      />
                      <TextSpan
                        lhs="earnedCumulativeBlock:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.ETH
                            .earnedCumulativeBlock
                        }
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base">
                      USDB
                    </AccordionTrigger>
                    <AccordionContent>
                      <TextSpan
                        lhs="earnedCumulative:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.USDB
                            .earnedCumulative
                        }
                      />
                      <TextSpan
                        lhs="earnedCumulativeBlock:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.USDB
                            .earnedCumulativeBlock
                        }
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-base">
                      WETH
                    </AccordionTrigger>
                    <AccordionContent>
                      <TextSpan
                        lhs="earnedCumulative:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.WETH
                            .earnedCumulative
                        }
                      />
                      <TextSpan
                        lhs="earnedCumulativeBlock:"
                        rhs={
                          points?.balancesByPointType.LIQUIDITY.byAsset.WETH
                            .earnedCumulativeBlock
                        }
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
            <CardFooter>
              <CardDescription>
                Most values are probably denoted in pts
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="developer">
          <Card style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
            <CardHeader>
              <CardTitle style={{ fontSize: '20px' }}>
                Developer [Blast Gold]
              </CardTitle>
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
            <CardFooter>
              <CardDescription>
                Most values are probably denoted in pts
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
