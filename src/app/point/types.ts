export type AuthChallenge = {
  success: boolean
  challengeData: string // save this for later; don't sign it
  message: string // this is what you need to sign
}

export type AuthSolve = {
  success: boolean
  bearerToken: string // will last 1 hour
}

type PointType = 'LIQUIDITY' | 'DEVELOPER'

// GET /v1/contracts/:contractAddress/point-balances
export type BalanceResponse = {
  success: boolean
  balancesByPointType: {
    LIQUIDITY: PointBalances & { byAsset: PointsByAsset }
    DEVELOPER: PointBalances
  }
}

type PointBalances = {
  // decimal strings
  available: string
  pendingSent: string

  // also decimal strings
  // cumulative so they don't decrease
  // a batch may become finalized before these numbers update
  earnedCumulative: string
  receivedCumulative: string // received from transfers (finalized)
  finalizedSentCumulative: string // sent from transfers (finalized)
}

type PointsByAsset = {
  ETH: AssetPoints
  WETH: AssetPoints
  USDB: AssetPoints
}

type AssetPoints = {
  // same semantics as PointBalances.earnedCumulative
  // but specific to an asset
  earnedCumulative: string // decimal string
  // earnedCumulative is the sum of points earned
  // from block 0 to earnedCumulativeBlock
  earnedCumulativeBlock: number
}
