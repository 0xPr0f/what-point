type AuthChallenge = {
  success: boolean
  challengeData: string // save this for later; don't sign it
  message: string // this is what you need to sign
}