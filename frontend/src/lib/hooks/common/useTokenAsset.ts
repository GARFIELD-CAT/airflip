/* eslint-disable import/no-unused-modules */
/* eslint-disable simple-import-sort/imports */
// network icons
import Binance from '@assets/icons/bnb.svg'
import Arbitrum from '@assets/icons/networks/arbitrum.svg'
import Aurora from '@assets/icons/networks/aurora.svg'
import Avalanche from '@assets/icons/networks/avalanche.svg'
import Base from '@assets/icons/networks/base.svg'
import Bsc from '@assets/icons/networks/bsc.svg'
import Ethereum from '@assets/icons/networks/ethereum.svg'
import Flare from '@assets/icons/networks/flare.svg'
import GravityAlpha from '@assets/icons/networks/gravity-alpha.svg'
import Iota from '@assets/icons/networks/iota.svg'
import Kaia from '@assets/icons/networks/kaia.svg'
import Kava from '@assets/icons/networks/kava.svg'

// Mobile networks icons
import ArbitrumMobile from '@assets/icons/networks/mobile-icons/arbitrum.svg'
import AvalancheMobile from '@assets/icons/networks/mobile-icons/avalanche.svg'
import BaseMobile from '@assets/icons/networks/mobile-icons/base.svg'
import BscMobile from '@assets/icons/networks/mobile-icons/bsc.svg'
import EthereumMobile from '@assets/icons/networks/mobile-icons/ethereum.svg'
import MantleMobile from '@assets/icons/networks/mobile-icons/mantle.svg'
import OptimismMobile from '@assets/icons/networks/mobile-icons/optimism.svg'
import PolygonMobile from '@assets/icons/networks/mobile-icons/polygon.svg'
import SeiMobile from '@assets/icons/networks/mobile-icons/sei.svg'
import MetisMobile from '@assets/icons/networks/mobile-icons/metis.svg'
import Metis from '@assets/icons/networks/metis.svg'
import Mantle from '@assets/icons/networks/mantle.svg'
import Optimism from '@assets/icons/networks/optimism.svg'
import Polygon from '@assets/icons/networks/polygon.svg'
import Rari from '@assets/icons/networks/rari.svg'
import Scroll from '@assets/icons/networks/scroll.svg'
import Sei from '@assets/icons/networks/sei.svg'
// import Taiko from '@assets/icons/networks/taiko.svg'


// token icons
import Dai from '@assets/icons/tokens/dai.svg'
import Eth from '@assets/icons/tokens/eth.svg'
import Frax from '@assets/icons/tokens/frax.svg'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import Wbtc from '@assets/icons/tokens/wbtc.svg'
import Weth from '@assets/icons/tokens/weth.svg'
import { useMemo } from 'react'

export interface ITokenAsset {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  TokenIconMobile?: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  name?: string
  chainId?: number
}

const TOKENS: ITokenAsset[] = [
  {
    TokenIcon: Eth,
    TokenIconMobile: Eth,
    symbol: 'ETH',
    name: 'Ethereum',
  },
  {
    TokenIcon: Weth,
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
  },
  {
    TokenIcon: Usdt,
    symbol: 'USDT',
    name: 'USDT',
  },
  {
    TokenIcon: Dai,
    symbol: 'DAI',
    name: 'DAI',
  },
  {
    TokenIcon: Frax,
    symbol: 'FRAX',
    name: 'FRAX',
  },
  {
    TokenIcon: Binance,
    symbol: 'Bsc',
    name: 'Binance',
  },
  {
    TokenIcon: Usdc,
    symbol: 'USDC',
    name: 'USDC',
  },
  {
    TokenIcon: Wbtc,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
  },
  {
    TokenIcon: Mantle,
    TokenIconMobile: MantleMobile,
    symbol: 'MNT',
    name: 'Mantle',
  },
  {
    TokenIcon: Optimism,
    TokenIconMobile: OptimismMobile,
    symbol: 'OP',
    name: 'Optimism',
  },
  {
    TokenIcon: Binance,
    symbol: 'BNB',
    name: 'BNB',
  },
  // network icons
  {
    TokenIcon: Ethereum,
    TokenIconMobile: EthereumMobile,
    symbol: 'eth-mainnet',
    chainId: 1,
    name: 'Ethereum',
  },
  {
    TokenIcon: Sei,
    TokenIconMobile: SeiMobile,
    symbol: 'SEI',
    chainId: 1329,
    name: 'Sei',
  },
  {
    TokenIcon: Optimism,
    TokenIconMobile: OptimismMobile,
    symbol: 'optimism-mainnet',
    chainId: 10,
    name: 'Optimism',
  },
  {
    TokenIcon: Arbitrum,
    TokenIconMobile: ArbitrumMobile,
    symbol: 'Arbitrum',
    chainId: 42_161,
    name: 'Arbitrum',
  },
  {
    TokenIcon: Base,
    TokenIconMobile: BaseMobile,
    symbol: 'Base',
    chainId: 8453,
    name: 'Base',
  },
  {
    TokenIcon: Polygon,
    TokenIconMobile: PolygonMobile,
    symbol: 'matic',
    chainId: 137,
    name: 'Polygon',
  },
  {
    TokenIcon: Avalanche,
    TokenIconMobile: AvalancheMobile,
    symbol: 'avalanche-mainnet',
    chainId: 43_114,
    name: 'Avalanche',
  },
  {
    TokenIcon: Polygon,
    TokenIconMobile: PolygonMobile,
    symbol: 'matic-mainnet',
    chainId: 137,
    name: 'Polygon',
  },
  {
    TokenIcon: Bsc,
    TokenIconMobile: BscMobile,
    symbol: 'bsc-mainnet',
    chainId: 56,
    name: 'Binance',
  },
  {
    TokenIcon: Mantle,
    TokenIconMobile: MantleMobile,
    symbol: 'mantle-mainnet',
    chainId: 5000,
    name: 'Mantle',
  },
  {
    TokenIcon: Metis,
    TokenIconMobile: MetisMobile,
    symbol: 'metis-mainnet',
    chainId: 1088,
    name: 'Metis',
  },

  {
    TokenIcon: Kava,
    symbol: 'kava-mainnet',
    chainId: 2222,
    name: 'Kava',
  },
  {
    TokenIcon: Kaia,
    symbol: 'klaytn-mainnet',
    chainId: 8217,
    name: 'Klaytn',
  },
  {
    TokenIcon: Iota,
    symbol: 'iota-mainnet',
    chainId: 8822,
    name: 'IOTA',
  },
  {
    TokenIcon: Rari,
    symbol: 'rari-mainnet',
    chainId: 1_380_012_617,
    name: 'RARI',
  },
  {
    TokenIcon: Flare,
    symbol: 'flare-mainnet',
    chainId: 14,
    name: 'Flare',
  },
  {
    TokenIcon: GravityAlpha,
    symbol: 'gravity-alpha-mainnet',
    chainId: 1625,
    name: 'Gravity Alpha',
  },
  {
    TokenIcon: Ethereum,
    TokenIconMobile: EthereumMobile,
    symbol: 'taiko-mainnet',
    chainId: 167_000,
    name: 'Taiko',
  },
  {
    TokenIcon: Sei,
    TokenIconMobile: SeiMobile,
    symbol: 'sei-mainnet',
    chainId: 1329,
    name: 'Sei',
  },
  {
    TokenIcon: Scroll,
    symbol: 'scroll-mainnet',
    chainId: 534_352,
    name: 'Scroll',
  },
  {
    TokenIcon: Aurora,
    symbol: 'aurora-mainnet',
    chainId: 1_313_161_554,
    name: 'Aurora',
  },
]

// by symbol or chainId
export const useTokenAsset = (query?: string | number | null) => {
  return useMemo(() => {
    if (!query) return
    if (typeof query === 'number' || !Number.isNaN(Number(query))) {
      return TOKENS.find((token) => token.chainId === Number(query))
    }
    if (typeof query === 'string') {
      return TOKENS.find(
        (token) =>
          query.toLowerCase()?.includes(token.symbol?.toLowerCase() || '') ||
          query.toLowerCase()?.includes(token.name?.toLowerCase() || ''),
      )
    }
  }, [query])
}
