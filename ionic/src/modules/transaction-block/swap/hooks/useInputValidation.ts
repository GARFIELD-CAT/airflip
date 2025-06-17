import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'

interface UseInputValidationParameters {
  inputValue: string
  assetBalance: string
  inputValueInUSD?: string
  onError: (error: string | null) => void
  hasAsset: boolean
}

/**
 * Hook to handle input validation for deposit amounts
 */
export const useInputValidation = ({
  inputValue,
  assetBalance,
  inputValueInUSD,
  onError,
  hasAsset,
}: UseInputValidationParameters) => {
  const [error, setError] = useState('')

  useEffect(() => {
    // Skip validation if no asset is selected or no input value
    if (!hasAsset || !inputValue) {
      setError('')
      onError(null)
      return
    }

    const inputValueBN = BigNumber(+inputValue)
    const assetBalanceBN = BigNumber(assetBalance)

    if ((assetBalanceBN && assetBalanceBN.isZero()) || inputValueBN.isNaN()) {
      setError('Invalid input or balance')
      onError('Invalid input or balance')
      return
    }

    if (inputValueBN.isGreaterThan(assetBalanceBN)) {
      setError('Exceeds balance')
      onError('Exceeds balance')
      return
    }

    setError('')
    onError(null)
  }, [inputValue, assetBalance, inputValueInUSD, onError, hasAsset])

  return error
}
