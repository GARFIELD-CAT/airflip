import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { DropResult } from 'react-beautiful-dnd'

interface TokenGroup {
  groupName: string
  tokenGroup: ITokenData[]
}

interface UseTokenOrderReturn {
  orderedGroups: string[]
  handleDragEnd: (result: DropResult) => void
  getOrderedTokenGroups: () => TokenGroup[]
  isInitialized: boolean
}

const STORAGE_KEY = 'token-groups-order' as const

interface StorageAdapter {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

const defaultStorageAdapter: StorageAdapter = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      console.error('Failed to set item in localStorage')
    }
  }
}

const parseStoredOrder = (storedOrder: string | null): string[] | null => {
  if (!storedOrder) return null
  
  try {
    const parsed = JSON.parse(storedOrder)
    return Array.isArray(parsed) ? parsed : null
  } catch {
    return null
  }
}

const mergeWithStoredOrder = (groupKeys: string[], storedOrder: string[] | null): string[] => {
  if (!storedOrder) return groupKeys
  
  const validOrder = storedOrder.filter(key => groupKeys.includes(key))
  const newGroups = groupKeys.filter(key => !validOrder.includes(key))
  
  return [...validOrder, ...newGroups]
}

const reorderArray = <T>(array: T[], sourceIndex: number, destinationIndex: number): T[] => {
  const result = Array.from(array)
  const [reorderedItem] = result.splice(sourceIndex, 1)
  result.splice(destinationIndex, 0, reorderedItem)
  
  return result
}

export const useTokenOrder = (
  groupedTokens: Record<string, ITokenData[]>,
  storageAdapter: StorageAdapter = defaultStorageAdapter
): UseTokenOrderReturn => {
  const groupKeys = useMemo(() => Object.keys(groupedTokens), [groupedTokens])
  
  const groupKeysHash = useMemo(() => groupKeys.join(','), [groupKeys])
  
  const [orderedGroups, setOrderedGroups] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (groupKeys.length === 0) return

    const storedOrder = storageAdapter.getItem(STORAGE_KEY)
    const parsedOrder = parseStoredOrder(storedOrder)
    const finalOrder = mergeWithStoredOrder(groupKeys, parsedOrder)
    
    setOrderedGroups(finalOrder)
    setIsInitialized(true)
  }, [groupKeysHash, storageAdapter])

  const saveOrder = useCallback((newOrder: string[]) => {
    storageAdapter.setItem(STORAGE_KEY, JSON.stringify(newOrder))
    setOrderedGroups(newOrder)
  }, [storageAdapter])

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return

    const newOrder = reorderArray(
      orderedGroups, 
      result.source.index, 
      result.destination.index
    )
    
    saveOrder(newOrder)
  }, [orderedGroups, saveOrder])

  const getOrderedTokenGroups = useCallback((): TokenGroup[] => {
    return orderedGroups
      .map(groupName => ({
        groupName,
        tokenGroup: groupedTokens[groupName] || []
      }))
      .filter(item => item.tokenGroup.length > 0)
  }, [orderedGroups, groupedTokens])

  return {
    orderedGroups,
    handleDragEnd,
    getOrderedTokenGroups,
    isInitialized
  }
} 