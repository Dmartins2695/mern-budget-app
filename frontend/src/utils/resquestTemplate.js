import axiosInstance from '../config/axiosInstance'
import { setCallSnackbar } from '../feature/snackbar/snackbarSlice'

export const makeRequest = (props) => {
	const { dispatch, method, url, params, data, handleResponse, loadingAction, timer = 1000 } =
		props
	loadingAction && dispatch(loadingAction(true))

	const config = {
		method: method,
		url: url,
		params: params || {},
		data: data || {},
	}

	try {
		// time out is here so its possible to see the loading feature working can be removed!
		setTimeout(() => {
			axiosInstance(config).then((response) => {
				handleResponse(response)
				loadingAction && dispatch(loadingAction(false))
			})
		}, timer)
	} catch (e) {
		console.log(e)
		loadingAction && dispatch(loadingAction(false))
		dispatch(
			setCallSnackbar({
				severity: 'error',
				message: e.response.data.error || e.response.statusText,
			}),
		)
	}
}
