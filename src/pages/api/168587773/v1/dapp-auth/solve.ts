// pages/api/dapp-auth-solve.ts
import { BLAST_TESTNET_API_URL } from '@/components/utils'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Forward the request to the external API
      const response = await axios.post(
        `${BLAST_TESTNET_API_URL}/v1/dapp-auth/solve`,
        req.body,
        {
          headers: {
            // Add any required headers here
            'Content-Type': 'application/json',
          },
        }
      )

      // Respond with data from the external API
      res.status(200).json(response.data)
    } catch (error) {
      // Handle errors
      res.status(error.response.status || 500).json({ message: error.message })
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
