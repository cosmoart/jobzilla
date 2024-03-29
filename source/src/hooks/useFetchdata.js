import axios from 'axios'
import { useState, useEffect } from 'react'

export default function useFetchData (url, params) {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const test = JSON.stringify(params)

	useEffect(() => {
		setLoading(true)
		setError(false)
		axios(url, { params })
			.then(res => {
				if (res.data.status >= 400 || res.data.status === null) return setError(true)
				setData(res.data)
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [url, test])

	return [data, loading, error]
}
