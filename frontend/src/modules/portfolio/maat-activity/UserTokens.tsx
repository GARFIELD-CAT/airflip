// src/modules/portfolio/maat-activity/UserTokens.tsx
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { AllAssets } from '../all-assets/AllAssets'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn( className)} {...rest}>
      <AllAssets className="!mt-0" />
    </div>
  )
}
