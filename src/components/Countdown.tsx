import { useEffect, useMemo, useState } from 'react'
import { getNextKolkataRelease, msToParts } from './time'
import styles from './countdown.module.css'

type UnitProps = {
  label: string
  value: number
}

function Unit({ label, value }: UnitProps) {
  const text = String(value).padStart(2, '0')

  return (
    <div className={styles.unit}>
      <div className={styles.value}>{text}</div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default function Countdown() {
  const target = useMemo(() => getNextKolkataRelease(new Date()), [])

  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now)
  const { days, hours, minutes, seconds } = msToParts(diff)
  const done = diff <= 0

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <Unit label="Days" value={days} />
        <Unit label="Hours" value={hours} />
        <Unit label="Min" value={minutes} />
        <Unit label="Sec" value={seconds} />
      </div>

      <div className={styles.meta}>
        <div>
          Target: <span className={styles.mono}>{formatKolkata(target)}</span>
        </div>
        <div className={styles.status}>{done ? 'Live soon…' : 'Counting down…'}</div>
      </div>
    </div>
  )
}

function formatKolkata(date: Date) {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

