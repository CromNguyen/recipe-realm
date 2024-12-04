export function FormatCookTime(cookTime: number) {
  if (!cookTime) return ''
  return `${cookTime} minute${cookTime > 1 ? 's' : ''}`
}
