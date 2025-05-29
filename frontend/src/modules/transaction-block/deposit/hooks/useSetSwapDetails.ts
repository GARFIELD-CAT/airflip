import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { formatTokenBalance } from '@utils/formatValue'
import { useEffect } from 'react'
import { formatUnits } from 'viem'

export const useSetSwapDetails = () => {
  const {
    swapRoute,
    depositFromNetwork,
    depositToNetwork,
    inputValue,
    depositAsset,
    vaultDepositTokenAddress,
    isTxZAP,
    setDepositTotalInUSD,
    setDepositTotalAmount,
    setTxDifficulty,
    setIsTxZAP,
  } = useTxStore()

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ swapRoute:', swapRoute)
    if (!swapRoute || !isTxZAP) {
      setDepositTotalInUSD(inputValue)
      setDepositTotalAmount(inputValue ?? '0')
      return
    }

    setDepositTotalInUSD(
      formatUnits(
        BigInt(swapRoute?.includedSteps?.[0]?.estimate?.toAmount ?? '0'),
        swapRoute?.includedSteps?.[0]?.action?.toToken?.decimals ?? 6,
      ),
    )
    setDepositTotalAmount(
      formatTokenBalance(
        swapRoute?.includedSteps?.[0]?.estimate?.toAmount ?? '0',
        swapRoute?.includedSteps?.[0]?.action?.toToken?.decimals ?? 6,
      ) ?? '0',
    )
  }, [swapRoute, setDepositTotalInUSD, inputValue, setDepositTotalAmount, isTxZAP])


  useEffect(() => {
    if (
      depositFromNetwork === depositToNetwork &&
      depositAsset?.contract_address.toLowerCase() ===
        vaultDepositTokenAddress?.toLowerCase()
    ) {
      setIsTxZAP(false)
      setDepositTotalAmount(inputValue)
      setDepositTotalInUSD(inputValue)
      return
    }

    setIsTxZAP(true)
  }, [
    depositAsset?.contract_address,
    depositFromNetwork,
    depositToNetwork,
    inputValue,
    setDepositTotalAmount,
    setDepositTotalInUSD,
    setIsTxZAP,
    vaultDepositTokenAddress,
  ])

  useEffect(() => {
    if (depositFromNetwork === depositToNetwork) {
      setTxDifficulty('on_chain')
    } else {
      setTxDifficulty('cross_chain')
    }
  }, [depositFromNetwork, depositToNetwork, setTxDifficulty])
}
