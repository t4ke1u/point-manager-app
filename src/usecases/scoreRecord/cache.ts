export const scoreRecordCacheKeyGenerator = {
  generateListKey: () => {
    return ['RECORD', 'LIST'] as const
  },

  generateItemKey: (id: string) => {
    return ['RECORD', 'ITEM', id] as const
  },
}
