export const CHAIN_NAMES_BY_ID = {
  1: 'Ethereum',
  10: 'Optimism',
  42_161: 'Arbitrum',
  137: 'Polygon',
  43_114: 'Avalanche',
  8453: 'Base',
  5000: 'Mantle',
  56: 'Binance',
  1088: 'Metis',
  2222: 'Kava',
  8217: 'Klaytn',
  8822: 'IOTA',
  1_380_012_617: 'RARI',
  14: 'Flare',
  1625: 'Gravity Alpha',
  167_000: 'Taiko',
  1329: 'Sei',
  534_352: 'Scroll',
  1_313_161_554: 'Aurora',
} as const

export const CHAIN_IDS_BY_NAME = {
  Ethereum: 1,
  Optimism: 10,
  Arbitrum: 42_161,
  Polygon: 137,
  Avalanche: 43_114,
  Base: 8453,
  Mantle: 5000,
  Bsc: 56,
  Metis: 1088,

  Kava: 2222,
  Kaia: 8217,
  IOTA: 8822,
  RARI: 1_380_012_617,
  Flare: 14,
  GravityAlpha: 1625,
  Taiko: 167_000,
  Sei: 1329,
  Scroll: 534_352,
  Aurora: 1_313_161_554,
} as const

export const SCAN_LINK_BY_CHAIN_ID = {
  1: 'https://etherscan.io/',
  42_161: 'https://arbiscan.io/',
  137: 'https://polygonscan.com/',
  10: 'https://optimistic.etherscan.io/',
  1329: 'https://seitrace.com/',
  43_114: 'https://snowtrace.io/',
  56: 'https://bscscan.com/',
  8453: 'https://basescan.org/',
  5000: 'https://explorer.mantle.xyz/',
  1088: 'https://explorer.metis.io/',
  2222: 'https://explorer.kava.io/',
  8217: 'https://explorer.kaia.io/',
  8822: 'https://explorer.iota.org/',
  1_380_012_617: 'https://explorer.rarible.org/',
  14: 'https://flare.flarescan.com/',
  1625: 'https://explorer.gravity.xyz/',
  167_000: 'https://explorer.taiko.xyz/',
  534_352: 'https://scroll.io/',
  1_313_161_554: 'https://explorer.aurora.dev/',
} as const

export const CHAINS = [
  CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.Bsc,
  CHAIN_IDS_BY_NAME.Base,
  CHAIN_IDS_BY_NAME.Mantle,
  CHAIN_IDS_BY_NAME.Metis,
  CHAIN_IDS_BY_NAME.Avalanche,
] as const

export const SUPPORTED_CHAINS_IDS = [
  CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.Bsc,
  CHAIN_IDS_BY_NAME.Base,
  CHAIN_IDS_BY_NAME.Avalanche,
  CHAIN_IDS_BY_NAME.Mantle,
  CHAIN_IDS_BY_NAME.Metis,
]


export type ChainType = (typeof CHAINS)[number]
export type SupportedChainType = (typeof SUPPORTED_CHAINS_IDS)[number]

export const CONFIRMATIONS_NUMBER = {
  [CHAIN_IDS_BY_NAME.Polygon]: 2,
  [CHAIN_IDS_BY_NAME.Arbitrum]: 24,
  [CHAIN_IDS_BY_NAME.Optimism]: 3,
  [CHAIN_IDS_BY_NAME.Base]: 3,
  [CHAIN_IDS_BY_NAME.Bsc]: 3,
}

export const ESTIMATED_TIME_OF_CONFIRMATION = 8


export const CHAIN_IDS_BY_BACKEND_NAMES = {
  arbitrum: CHAIN_IDS_BY_NAME.Arbitrum,
  polygon: CHAIN_IDS_BY_NAME.Polygon,
  optimism: CHAIN_IDS_BY_NAME.Optimism,
  base: CHAIN_IDS_BY_NAME.Base,
  avalanche: CHAIN_IDS_BY_NAME.Avalanche,
  bsc: CHAIN_IDS_BY_NAME.Bsc,
  mantle: CHAIN_IDS_BY_NAME.Mantle,
  metis: CHAIN_IDS_BY_NAME.Metis,
  sei: CHAIN_IDS_BY_NAME.Sei,
} as const

export const CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO = {
  ethereum: CHAIN_IDS_BY_NAME.Ethereum,
  ...CHAIN_IDS_BY_BACKEND_NAMES,
} as const

export const CHAIN_BACKEND_NAMES_BY_ID = Object.fromEntries(
  Object.entries(CHAIN_IDS_BY_BACKEND_NAMES).map(([key, value]) => [value, key]),
) as Record<ChainType, keyof typeof CHAIN_IDS_BY_BACKEND_NAMES>

export const LIFI_CHAIN_IDS = {
  1: 'ETH',
  56: 'BSC',
  42_161: 'ARB',
  8453: 'BAS',
  43_114: 'AVA',
  137: 'POL',
  534_352: 'SCL',
  10: 'OPT',
  1_313_161_554: 'AUR',
  1329: 'SEI',
  5000: 'MNT',
} as const
