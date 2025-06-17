export const ROUTES = {
  SWAP: '/swap',
  PORTFOLIO: '/portfolio',
} as const

export type RoutesType = keyof typeof ROUTES
