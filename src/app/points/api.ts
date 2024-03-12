import axios from 'axios'
const TESTNET_API_URL: string = 'https://waitlist-api.develop.testblast.io'

export const dappAuthChallenge = async (
  contractAddress: string,
  operatorAddress: string
) => {
  try {
    const response = await axios.post(
      `${TESTNET_API_URL}/v1/dapp-auth/challenge`,
      {
        contractAddress: contractAddress, // contract with points to be distributed
        operatorAddress: operatorAddress, // the EOA configured with IBlastPoints
      }
    )

    console.log('Response:', response.data)
    return {
      success: true,
      challengeData: '0x', // save this for later; don't sign it
      message: '', // this is what you need to sign
    }
  } catch (error) {
    console.error('Error making post request:', error.response)
  }
}

dappAuthChallenge('', '')
