import {
	setCategories,
	setParentCategories,
} from '../../feature/data/categorySlice'
import { makeRequest } from '../../utils/requestTemplate'

export const getSubCategories = (dispatch, selected) => {
	const handleResponse = (response) => {
		dispatch(setCategories(response.data))
	}

	makeRequest({
		dispatch,
		handleResponse,
		method: 'get',
		url: `/api/category/parent/${selected.item._id}`,
		timer: 0,
	})
}

export const getParentCategories = (dispatch) => {
	const handleResponse = (response) => {
		dispatch(setParentCategories(response.data))
	}

	makeRequest({
		dispatch,
		handleResponse,
		method: 'get',
		url: `/api/parent-categories`,
		timer: 0,
	})
}
