import { useEffect, useState } from 'preact/hooks'
import dayjs from 'dayjs'

/**
 * @see https://day.js.org/docs/en/display/format
 *
 * @param props The format to display
 * @returns Auto-updating Date
 */
export function DateTime(props: { format: string }) {
  const [date, setDate] = useState(new Date())
  const { format } = props

  useEffect(() => {
    // Sometimes it skips when state changes, hence the 100ms
    const timer = setInterval(() => setDate(new Date()), 100)

    return () => {
      clearInterval(timer)
    }
  })

  return <p>{dayjs(date).format(format)}</p>
}
