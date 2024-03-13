import axios from 'axios'
import { cookies } from 'next/headers'

const cookieStore = cookies()

export const dappAuthChallenge = async (
  contractAddress: string,
  operatorAddress: string
) => {
  try {
    const response = await axios({
      method: 'post', //you can set what request you want to be
      url: '/api/dapp-auth-challenge',
      data: {
        contractAddress: contractAddress,
        operatorAddress: operatorAddress,
      },
      headers: {},
    })
    console.log('Response:', response.data)
    return response.data
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
      url: '/api/dapp-auth-solve',
      data: {
        challengeData: challengeData,
        signature: signature,
      },
      headers: {},
    })
    console.log('Response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error making post request:', error.response)
  }
}
