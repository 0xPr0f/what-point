import axios from 'axios'
import { AuthChallenge, AuthSolve, BalanceResponse } from './types'

export const dappAuthChallenge = async (
  contractAddress: string,
  operatorAddress: string
) => {
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: '/api/v1/dapp-auth-challenge',
      data: {
        contractAddress: contractAddress,
        operatorAddress: operatorAddress,
      },
      headers: {},
    })
    console.log('Response:', response.data)
    return response.data as AuthChallenge
  } catch (error) {
    console.error('Error making post request:', error.response)
  }
}
export const dappAuthSolve = async (
  challengeData: string,
  signature: string
) => {
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: '/api/v1/dapp-auth-solve',
      data: {
        challengeData: challengeData,
        signature: signature,
      },
      headers: {},
    })
    console.log('Response:', response.data)
    return response.data as AuthSolve
  } catch (error) {
    console.error('Error making post request:', error.response)
  }
}

export const pointBalance = async (address: string, bearerToken: string) => {
  if (!bearerToken) throw new Error('No bearer token')
  try {
    const response = await axios({
      method: 'get', //you can set what request you want to be
      url: '/api/v1/contracts/' + address,
      data: {},
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    })

    console.log(response.data)
    return response.data as BalanceResponse
  } catch (error) {
    console.error(error)
    console.log(error?.response.status)
    return error?.response
  }
}
