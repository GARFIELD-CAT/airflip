export const calculateSwapBonus = (usdValue: number): number => {
  if (usdValue <= 0) return 0
  
  const calculatedBonus = Math.floor(usdValue * 0.5)
  
  return Math.max(calculatedBonus, 1)
} 