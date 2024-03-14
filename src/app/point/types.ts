export type AuthChallengeResponse = {
  success: boolean
  challengeData: string // save this for later; don't sign it
  message: string // this is what you need to sign
}

export type AuthSolveResponse = {
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

// PUT /v1/contracts/:contractAddress/batches/:batchId
//
// batchId is a client provided string (max length 64)
// This endpoint is idempotent on batchId (for a non-idempotent variant see below)
// If a request fails, the request can be retried with the same batchId
// If the batchId already exists, we return a 409
// We recommend using a UUID
//
// The contract must have enough points of pointType available
// for this request to succeed.
type Transfer = {
  toAddress: string

  // decimal string, like "1.05"
  // must be >= MINIMUM_TRANSFER_SIZE
  // must have decimal places <= MAX_TRANSFER_DECIMALS
  points: string
}

type Request = {
  pointType: PointType

  // 1 <= transfers.length <= MAX_TRANSFERS_PER_BATCH
  // transfers[i].toAddress !== contractAddress (no self transfers)
  // count(transfers[].toAddress = address) <= 1 (only one transfer per address)
  transfers: Transfer[]

  // number of seconds to wait before finalizing this batch
  // must be between MINIMUM_FINALIZE_SECONDS and DEFAULT_FINALIZE_SECONDS
  // if not present, uses DEFAULT_FINALIZE_SECONDS
  secondsToFinalize?: number | null
}

type BatchedBatchIdResonse = {
  success: boolean
  batchId: string
}
