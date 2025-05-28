import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'

export const Swap = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10 pb-10">
      <div className="absolute h-[31.4375rem] w-[24.6875rem] shrink-0 rounded-[31.4375rem] bg-[rgba(125,_38,_255,_0.33)] blur-[297.8999938964844px]" />
      <div className="pointer-events-auto relative z-10 mt-10 flex w-full max-w-[38rem] flex-col gap-6 max-lg:mt-8 max-lg:max-w-[600px] max-lg:gap-4">
        <TransactionBlock />
      </div>
    </div>
  )
}
