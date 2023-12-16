const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const MONTH_NAMES_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const formatTimeAgo = (dateRaw: Date | undefined, format: 'short' | 'long' = 'short') => {
  if (!dateRaw) return ''

  const date = new Date(dateRaw)
  const now = new Date()
  const timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const minutes = Math.floor(timeDifferenceInSeconds / 60)
  const hours = Math.floor(timeDifferenceInSeconds / 3600)
  const days = Math.floor(timeDifferenceInSeconds / 86400)

  // Ex. December 1, 2023 / December 1 / Dec 1, 2023 / Dec 1
  if (days >= 1) {
    if (format === 'short') {
      const day = date.getDate()
      const month = MONTH_NAMES_SHORT[date.getUTCMonth()]
      const year = date.getFullYear()
      const notThisYear = year !== new Date().getFullYear()

      return `${month} ${day}` + (notThisYear ? `, ${year}` : '')
    }

    const day = date.getDate()
    const month = MONTH_NAMES_LONG[date.getUTCMonth()]
    const year = date.getFullYear()
    const notThisYear = year !== new Date().getFullYear()

    return `${month} ${day}` + (notThisYear ? `, ${year}` : '')
  }

  // Ex. 3h ago / 3 hours ago
  else if (hours >= 1) {
    if (format === 'short') {
      return `${hours}h ago`
    }

    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }

  // Ex. 1m ago / 1 minute ago
  else if (minutes >= 1) {
    if (format === 'short') {
      return `${minutes}m ago`
    }

    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }

  return 'just now'
}

export default formatTimeAgo
