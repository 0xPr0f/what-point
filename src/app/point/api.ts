import axios from 'axios'
import {
  AuthChallengeResponse,
  AuthSolveResponse,
  BalanceResponse,
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
export function isError(x: any) {
  return (
    x instanceof Error ||
    (typeof x === 'object' && x !== null && x.error) ||
    (typeof x === 'string' && x.startsWith('Error:'))
  )
}
