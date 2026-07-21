export const getTitleColorClass = (titleColor?: ('dark' | 'light') | null): string =>
  titleColor === 'light' ? 'text-white' : 'text-gray-900'
