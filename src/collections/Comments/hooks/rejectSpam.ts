import type { CollectionBeforeValidateHook } from 'payload'

export const rejectSpam: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.website) {
    throw new Error('Spam detected.')
  }

  return data
}
