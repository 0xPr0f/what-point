// pages/api/contracts/[contractAddress].ts
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
const TESTNET_API_URL: string = 'https://waitlist-api.develop.testblast.io'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { authorization } = req.headers
    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing' })
    }
    try {
      const { contractAddress } = req.query

      // Forward the request to the external API
      const response = await axios.get(
        `${TESTNET_API_URL}/v1/contracts/${contractAddress}/point-balances`,
        {
          headers: {
            // Optional: Include any required headers here
            'Content-Type': 'application/json',
            Authorization: authorization,
          },
        }
      )

      // Respond with data from the external API
      res.status(200).json(response.data)
    } catch (error) {
      // Handle errors
      res.status(error.response?.status || 500).json({ message: error.message })
    }
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
