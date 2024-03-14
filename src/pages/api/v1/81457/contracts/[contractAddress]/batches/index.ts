// pages/api/contracts/[contractAddress]/batches
//POST /v1/contracts/:contractAddress/batches
import { BLAST_MAINNET_API_URL } from '@/components/utils'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { authorization } = req.headers
    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing' })
    }
    try {
      const { contractAddress } = req.query

      // Forward the request to the external API
      const response = await axios.post(
        `${BLAST_MAINNET_API_URL}/v1/contracts/${contractAddress}/batches`,
        req.body,
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
  } else if (req.method === 'GET') {
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
        `${BLAST_MAINNET_API_URL}/v1/contracts/${contractAddress}/batches`,

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
    // Handle any non-GET or non-POST requests
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
