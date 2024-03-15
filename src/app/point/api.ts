import axios from 'axios'
import {
  AuthChallengeResponse,
  AuthSolveResponse,
  BalanceResponse,
  BatchedBatchIdResonse,
  SingleBatchResponse,
  MultipleBatchResponse,
} from './types'

export const dappAuthChallenge = async (
  contractAddress: string,
  operatorAddress: string,
  chainId: string
) => {
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: `/api/${chainId}/v1/dapp-auth/challenge`,
      data: {
        contractAddress: contractAddress,
        operatorAddress: operatorAddress,
      },
      headers: {},
    })
    // //console.log('Response:', response.data)
    return response.data as AuthChallengeResponse
  } catch (error) {
    console.error('Error making post request:', error.response)
    return error?.response
  }
}
export const dappAuthSolve = async (
  challengeData: string,
  signature: string,
  chainId: string
) => {
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: `/api/${chainId}/v1/dapp-auth/solve`,
      data: {
        challengeData: challengeData,
        signature: signature,
      },
      headers: {},
    })
    //console.log('Response:', response.data)
    return response.data as AuthSolveResponse
  } catch (error) {
    console.error('Error making post request:', error.response)
    return error?.response
  }
}

export const pointBalance = async (
  address: string,
  bearerToken: string,
  chainId: string
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'get', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${address}/point-balances`,
      data: {},
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as BalanceResponse
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export const submitBatchIdempotently = async (
  pointType: string | number,
  transfers: any,
  contractaddress: string,
  batchId: any,
  bearerToken: string,
  chainId: string,
  secondsToFinalize?: number
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'put', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${contractaddress}/batches/${batchId}`,
      data: {
        pointType: pointType,
        transfers: transfers,
        secondsToFinalize: secondsToFinalize || null,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as BatchedBatchIdResonse
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export const submitBatchConveniently = async (
  pointType: string | number,
  transfers: any,
  contractaddress: string,
  bearerToken: string,
  chainId: string,
  secondsToFinalize?: number
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${contractaddress}/batches`,
      data: {
        pointType: pointType,
        transfers: transfers,
        secondsToFinalize: secondsToFinalize || null,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as BatchedBatchIdResonse
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export const fetchSingleBatch = async (
  contractaddress: string,
  batchId: any,
  bearerToken: string,
  chainId: string
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'get', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${contractaddress}/batches/${batchId}`,
      data: {},
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as SingleBatchResponse
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export const fetchMultipleBatch = async (
  contractaddress: string,
  bearerToken: string,
  chainId: string
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'get', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${contractaddress}/batches`,
      data: {},
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as MultipleBatchResponse
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export const cancelBatch = async (
  contractaddress: string,
  batchId: any,
  bearerToken: string,
  chainId: string
) => {
  if (!bearerToken) {
    return new Error('No bearer token')
  }
  try {
    const response = await axios({
      method: 'delete', //you can set what request you want to be
      url: `/api/${chainId}/v1/contracts/${contractaddress}/batches/${batchId}`,
      data: {},
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    //console.log(response.data)
    return response.data as { success: boolean }
  } catch (error) {
    console.error(error)
    //console.log(error?.response.status)
    return error?.response
  }
}
export function isError(x: any) {
  return (
    x instanceof Error ||
    (typeof x === 'object' && x !== null && x.error) ||
    (typeof x === 'string' && x.startsWith('Error:'))
  )
}
