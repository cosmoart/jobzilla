import axios from 'axios'
import { useState, useEffect } from 'react'

export default function useFetchData (url, params = {}) {
	console.log(url, params)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		axios(url, { params })
			.then(res => {
				if (res.data.status >= 400) return setError(true)
				setData(res.data)
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}, [url, params])

	return [data, loading, error]
}
