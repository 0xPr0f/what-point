export const loadExternalURL = (url: string, newpage = true) => {
  if (newpage == true) {
    window.open(url, '_blank')
  } else if (newpage == false) {
    window.open(url, '_self')
  }
}

export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (error) {
    console.log(error)
  }
}

export const shortenText = (str: string, n1 = 6, n2 = 4) => {
  if (str) {
    return `${str.slice(0, n1)}...${str.slice(str.length - n2)}`
  }
  return ''
}
export function isValidAddress(address: string) {
  // Regular expression pattern for Ethereum addresses
  const pattern = /^(0x)?[0-9a-fA-F]{40}$/

  // Check if the address matches the pattern
  return pattern.test(address)
}
export const BLAST_MAINNETSCAN_URL = 'https://blastscan.io/'
export const BLAST_TESTNETSCAN_URL = 'https://sepolia.blastscan.io/'
