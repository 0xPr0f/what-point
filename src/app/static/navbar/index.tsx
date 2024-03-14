import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      <div className={`flex justify-between items-center px-4 py-2 bg-black`}>
        <span className="text-xl font-bold ">SBPT</span>
        <div className="flex flex-1 ml-4 gap-2">
          <Button
            style={{ color: '#9d9d9d' }}
            variant={isActive('/') ? 'ghost' : 'default'}
            asChild
          >
            <Link href="/" className="inline-block px-4 py-2">
              Home
            </Link>
          </Button>
          <Button
            style={{ color: '#9d9d9d' }}
            variant={isActive('/safe') ? 'ghost' : 'default'}
            asChild
          >
            <Link href="/safe" className="inline-block px-4 py-2">
              Safe
            </Link>
          </Button>
          <Button
            style={{ color: '#9d9d9d' }}
            variant={isActive('/point') ? 'ghost' : 'default'}
            asChild
          >
            <Link href="/point" className="inline-block px-4 py-2">
              Points
            </Link>
          </Button>
        </div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading'
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated')

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button
                        onClick={openConnectModal}
                        variant="default"
                        type="button"
                      >
                        Connect Wallet
                      </Button>
                    )
                  }

                  if (chain.unsupported) {
                    return (
                      <Button
                        onClick={openChainModal}
                        style={{ color: '#481a1d' }}
                        variant="destructive"
                        type="button"
                      >
                        Switch network
                      </Button>
                    )
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Button
                        onClick={openChainModal}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: '#9d9d9d',
                        }}
                        type="button"
                        variant="default"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </Button>

                      <Button
                        style={{ color: '#9d9d9d' }}
                        variant="default"
                        onClick={openAccountModal}
                        type="button"
                      >
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  )
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </>
  )
}
