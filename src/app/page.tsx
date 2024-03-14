'use client'
import { Button } from '@/components/ui/button'
import { loadExternalURL } from '@/components/utils'
import Link from 'next/link'
import React from 'react'
export default function Home() {
  return (
    <>
      <div className="overflow-hidden flex flex-col sm:flex-row lg:flex-row w-full h-screen">
        <div className="w-3/5 flex items-center bg-black  justify-center">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">SBPT</h1>
            <p className="text-2xl">
              Why do i need points? Why do i need safe? - mystery
            </p>
            {/**probably make some scrolling stuffs here */}
            <p className="text-2xl">This site is probably point-less</p>
          </div>
        </div>

        <div
          style={{ backgroundColor: '#161616' }}
          className="w-2/5 flex flex-col items-center justify-center p-12 "
        >
          <div className="space-y-2 flex flex-col gap-0 items-center">
            <span className="font-light text-3xl">Explore</span>
            <div className="flex flex-row gap-5 items-center justify-center">
              <Button size="lg" variant="black" asChild>
                <Link href="/safe" className="inline-block px-4 py-2">
                  Safe
                </Link>
              </Button>
              <Button size="lg" variant="default" asChild>
                <Link href="/point" className="inline-block px-4 py-2">
                  Blast Point
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-4 text-sm">
            © {new Date().getFullYear()} SBPT |
            <span
              onClick={() => {
                loadExternalURL('https://github.com/0xPr0f/what-point', true)
              }}
              className="cursor-pointer  hover:text-white"
            >
              {' '}
              Github
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
