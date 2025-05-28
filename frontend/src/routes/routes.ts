export const ROUTES = {
  SWAP: '/',
  PORTFOLIO: '/portfolio',
} as const

export type RoutesType = keyof typeof ROUTES
