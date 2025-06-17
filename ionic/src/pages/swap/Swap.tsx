import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'

export const Swap = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10 pb-10 text-text-100">
      <svg className="absolute h-[31.4375rem] w-[24.6875rem] shrink-0 rounded-[31.4375rem] bg-[rgba(125,_38,_255,_0.33)] blur-[297.8999938964844px]" width="1440" height="900" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_74_6857)">
          <ellipse cx="708.5" cy="421.5" rx="197.5" ry="251.5" fill="#7D26FF" fill-opacity="0.33"/>
        </g>
        <defs>
          <filter id="filter0_f_74_6857" x="-84.8" y="-425.8" width="1586.6" height="1694.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="297.9" result="effect1_foregroundBlur_74_6857"/>
          </filter>
        </defs>
      </svg>
      <div className="pointer-events-auto relative z-10 mt-10 flex w-full max-w-[38rem] flex-col gap-6 max-lg:mt-8 max-lg:max-w-[600px] max-lg:gap-4">
        <TransactionBlock />
      </div>
    </div>
  )
}
