export function getYoutubeVideoId(url = '') {
  const value = String(url).trim()
  if (!value) return ''

  const shortMatch = value.match(/youtu\.be\/([^?&/]+)/)
  if (shortMatch) return shortMatch[1]

  const longMatch = value.match(/[?&]v=([^?&/]+)/)
  if (longMatch) return longMatch[1]

  return ''
}
