'use client'
import Navbar from './static/navbar'
import * as React from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import {
  rabbyWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { blastSepolia } from 'viem/chains'
import { Toaster } from '@/components/ui/sonner'

const { wallets } = getDefaultWallets()
export const config = getDefaultConfig({
  appName: 'Blast Point Test',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  wallets: [
    ...wallets,
    {
      groupName: 'Others',
      wallets: [rabbyWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [blastSepolia],

  ssr: true,
})

const queryClient = new QueryClient()

export default function Interport({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={darkTheme({
              accentColor: '#c3073f',
              accentColorForeground: '#1a1a1d',
              borderRadius: 'none',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
          >
            <Navbar />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '100px',
              }}
            >
              {children}
            </div>
            <Toaster />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
