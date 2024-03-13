'use client'

import { useCookies } from 'next-client-cookies'
import React, { useEffect, useState } from 'react'

export default function Point({ params }: { params: { paddress: string } }) {
  const cookies = useCookies()
  const deleteCookies = () => {
    cookies.remove('points-bearer-token')
  }
  const [bearerToken, setbearerToken] = useState<string>(
    cookies.get('points-bearer-token')
      ? atob(cookies.get('points-bearer-token') as string)
      : ''
  )
  const address = params.paddress
  useEffect(() => {
    console.log(params.paddress)
    console.log(bearerToken)
  }, [])
  return <div></div>
}
