export type TimeParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

export function clampToInt(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.floor(value))
}

export function msToParts(totalMs: number): TimeParts {
  const safeMs = clampToInt(totalMs)
  const totalSeconds = Math.floor(safeMs / 1000)

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, totalMs: safeMs }
}

/**
 * Returns a Date representing Feb 17, 12:00 in Asia/Kolkata for a given year.
 * We construct it by getting the timezone offset (in minutes) for that instant,
 * then converting to an equivalent UTC timestamp.
 */
export function getKolkataReleaseDate(year: number): Date {
  const month = 2
  const day = 17
  const hour = 12
  const minute = 0
  const second = 0

  const approxUtc = Date.UTC(year, month - 1, day, hour, minute, second)
  const offsetMinutes = getTimeZoneOffsetMinutes(new Date(approxUtc), 'Asia/Kolkata')
  return new Date(approxUtc - offsetMinutes * 60_000)
}

export function getNextKolkataRelease(now: Date): Date {
  const y = now.getUTCFullYear()
  const current = getKolkataReleaseDate(y)
  if (now.getTime() <= current.getTime()) return current
  return getKolkataReleaseDate(y + 1)
}

// Inspired by date-fns-tz approach but implemented locally.
export function getTimeZoneOffsetMinutes(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const parts = dtf.formatToParts(date)
  const map = new Map(parts.map((p) => [p.type, p.value]))
  const year = Number(map.get('year'))
  const month = Number(map.get('month'))
  const day = Number(map.get('day'))
  const hour = Number(map.get('hour'))
  const minute = Number(map.get('minute'))
  const second = Number(map.get('second'))

  const asUtc = Date.UTC(year, month - 1, day, hour, minute, second)
  return (asUtc - date.getTime()) / 60_000
}

