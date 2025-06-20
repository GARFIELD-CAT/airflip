import { cn } from '@utils/cn'
import { IonRouterLink } from '@ionic/react'
import { useLocation } from 'react-router-dom'

import type { IMenuItem } from '../hooks/useMenu'

export const NavLinkMenuItem = (props: IMenuItem) => {
  const { href, label, icon: Icon, callback } = props
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <IonRouterLink
      routerLink={href}
      key={label}
      className={cn(
        'text-[0.875rem] max-md:text-[1.25rem] font-medium leading-4 text-text-100 flex items-center gap-2 p-3 max-md:py-4 hover:text-main-100 [&:hover_svg_path]:stroke-main-100 hover:bg-main-10 rounded-xl',
        {
          'text-main-100 [&_svg_path]:stroke-main-100 bg-main-10': isActive,
        },
      )}
      onClick={callback}
    >
      <div className="flex items-center gap-2">
      {Icon && (
        <Icon className="size-4 max-md:size-6 [&_path]:stroke-[#8585A9] [&_path]:stroke-[1.3] group-hover:[&_path]:stroke-main-100" />
      )}
      {label}
      </div>
    </IonRouterLink>
  )
}
