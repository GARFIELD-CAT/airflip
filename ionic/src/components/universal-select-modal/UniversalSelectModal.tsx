import { SystemMessage } from '@components/system-message'
import { Dialog, DialogTrigger } from '@components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@components/ui/drawer'
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'
import type { ChainType } from '@constants/chains'
import { useModalVariant } from '@hooks/common/useModalVariant'
import { ResponsiveDialogContent } from '@modules/transaction-block/transaction-review/components/ResponsiveDialogContent'
import { SelectChainTrigger } from '@modules/transaction-block/swap/components/SelectChainTrigger'
import { SelectNetworkPopover } from '@modules/transaction-block/shared/components/SelectNetworkPopover'
import type { HTMLAttributes, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { IonList, IonSearchbar } from '@ionic/react'

interface TokensByChain<T> {
  [chain: string]: T[]
}

interface UniversalSelectModalProperties<T, R = T> {
  selectedItem?: T
  items: TokensByChain<T> | T[]
  isLoading?: boolean
  filterByNetwork?: boolean
  filterBySearch?: boolean
  filterItems?: (
    items: TokensByChain<T> | T[],
    searchValue: string,
    network: ChainType | null,
  ) => T[]
  renderTrigger: (selectedItem?: T) => ReactNode
  renderItem: (item: T, onChange: (value: R) => void) => ReactNode
  onChange: (value: R) => void
}

const renderItems = <T, R>(
  items: TokensByChain<T> | T[],
  renderItem: (item: T, onChange: (value: R) => void) => ReactNode,
  handleChange: (item: R) => void,
) => {
  if (Array.isArray(items)) return items.map((item) => renderItem(item, handleChange))
  return Object.values(items)
    .flat()
    .map((item) => renderItem(item, handleChange))
}

export const UniversalSelectModal = <T, R = T>({
  selectedItem,
  items,
  isLoading,
  renderTrigger,
  renderItem,
  onChange,
  filterByNetwork = false,
  filterBySearch = false,
  filterItems,
}: UniversalSelectModalProperties<T, R> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) => {
  const [opened, setOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [network, setNetwork] = useState<ChainType | null>(null)
  const { isDrawer } = useModalVariant()

  const handleOpenChange = useCallback((open: boolean) => {
    setOpened(open)
    if (!open) {
      setSearchValue('')
      setNetwork(null)
    }
  }, [])

  const handleChange = useCallback(
    (item: R) => {
      onChange(item)
      handleOpenChange(false)
    },
    [onChange, handleOpenChange],
  )

  const filteredItems = filterItems
    ? filterItems(items, searchValue, network)
    : ([] as T[])

  const modalContent = (
    <>
      {(filterBySearch || filterByNetwork) && (
        <div className="relative flex w-full items-stretch gap-2 px-6 py-4 max-lg:max-w-full">
          {filterBySearch && (
            <IonSearchbar
              value={searchValue}
              onIonInput={(e) => setSearchValue(e.detail.value || '')}
              placeholder="Search"
              className="grow rounded-xl border border-stroke-40100 bg-input-active"
              style={{
                '--background': 'transparent',
                '--color': 'var(--text-1100)',
                '--placeholder-color': 'var(--text-2100)',
                '--icon-color': 'var(--text-2100)',
                '--clear-button-color': 'var(--text-2100)',
                '--border-radius': '0.75rem',
                '--padding-start': '1.5rem',
                '--padding-end': '1.5rem',
                '--padding-top': '1rem',
                '--padding-bottom': '1rem',
              } as React.CSSProperties}
            />
          )}
          {filterByNetwork && (
            <SelectNetworkPopover
              chain={network}
              onChange={setNetwork}
              trigger={<SelectChainTrigger chain={network} />}
              showAllNetworksOption
            />
          )}
        </div>
      )}

      <ScrollArea className="h-[19.5rem] overscroll-none px-1 max-lg:grow">
        <IonList className="space-y-1">
          {isLoading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
                />
              ))}
            </>
          )}

          {renderItems(
            filterByNetwork || filterBySearch ? filteredItems : items,
            renderItem,
            handleChange,
          )}

          {filteredItems.length === 0 && searchValue && (
            <SystemMessage
              className="mx-5"
              variant="error"
              message="Whoops...This token was not found"
            />
          )}
        </IonList>
      </ScrollArea>
    </>
  )

  const trigger = renderTrigger(selectedItem)

  if (isDrawer) {
    return (
      <Drawer open={opened} onOpenChange={handleOpenChange}>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent className="max-h-[80vh] overflow-hidden border border-stroke-100">
          {modalContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={opened} onOpenChange={handleOpenChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <ResponsiveDialogContent
        className="max-w-[31.25rem] border border-stroke-100"
        opened={opened}
        setOpened={handleOpenChange}
        showCloseButton
      >
        {modalContent}
      </ResponsiveDialogContent>
    </Dialog>
  )
}
