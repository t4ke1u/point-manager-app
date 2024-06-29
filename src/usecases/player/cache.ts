export const playerCacheKeyGenerator = {
  generateListKey: () => {
    return ['PLAYER', 'LIST'] as const
  },

  generateItemKey: (id: string) => {
    return ['PLAYER', 'ITEM', id] as const
  },
}
