import axiosInstance from '../config/axiosInstance'
import { setCallSnackbar } from '../feature/snackbar/snackbarSlice'

export const makeRequest = (props) => {
	const {
		dispatch,
		method,
		url,
		params,
		data,
		handleResponse,
		loadingAction,
		handleError,
		timer = 1000,
	} = props
	loadingAction && dispatch(loadingAction(true))

	const config = {
		method: method,
		url: url,
		params: params || {},
		data: data || {},
	}
	setTimeout(() => {
		// time out is here so its possible to see the loading feature working can be removed!
		axiosInstance(config)
			.then((response) => {
				handleResponse(response)
				loadingAction && dispatch(loadingAction(false))
			})
			.catch((e) => {
				console.log(e)
				dispatch(
					setCallSnackbar({
						severity: 'error',
						message:
							e?.response?.data?.error || e.response?.statusText || 'Unknown Error!',
					}),
				)
				handleError && handleError()
			})
			.finally(() => {
				loadingAction && dispatch(loadingAction(false))
			})
	}, timer)
}
