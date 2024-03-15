// pages/api/contracts/[contractAddress]/batches/[batchId].ts
//POST /v1/contracts/:contractAddress/batches/:batchid
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
      const { contractAddress, batchId } = req.query

      // Forward the request to the external API
      const response = await axios.post(
        `${BLAST_MAINNET_API_URL}/v1/contracts/${contractAddress}/batches/${batchId}`,
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
      const { contractAddress, batchId } = req.query

      // Forward the request to the external API
      const response = await axios.get(
        `${BLAST_MAINNET_API_URL}/v1/contracts/${contractAddress}/batches/${batchId}`,

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
  } else if (req.method === 'DELETE') {
    const { authorization } = req.headers
    if (!authorization) {
      return res
        .status(401)
        .json({ message: 'Authorization header is missing' })
    }
    try {
      const { contractAddress, batchId } = req.query

      // Forward the request to the external API
      const response = await axios.delete(
        `${BLAST_MAINNET_API_URL}/v1/contracts/${contractAddress}/batches/${batchId}`,
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
    // Handle any non-GET or non-POST or non-DELETE requests
    res.setHeader('Allow', ['POST', 'GET', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
