const DATE_UNITS = [
	['month', 2592000],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1]
]

const getDateDiffs = (timestamp) => {
	const now = Date.now()
	const elapsed = (timestamp - now) / 1000

	for (const [unit, secondsInUnit] of DATE_UNITS) {
		if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
			const value = Math.round(elapsed / secondsInUnit)
			return { value, unit }
		}
	}
}

export default function useTimeAgo (timestamp) {
	const { value, unit } = getDateDiffs(timestamp)
	const rtfShort = new Intl.RelativeTimeFormat('es', { style: 'short' })
	const rtfLong = new Intl.RelativeTimeFormat('es', { style: 'long' })
	const longTimeAgo = rtfLong.format(value, unit)
	const newTime = unit === 'minute' || unit === 'hour' || unit === 'second'

	return {
		shortTimeAgo: rtfShort.format(value, unit),
		longTimeAgo,
		newTime
	}
}
