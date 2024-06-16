import { setInitialStateCategories } from '../feature/data/categorySlice'
import { setInitialStateIncomes } from '../feature/data/incomeSlice'
import { setInitialStateLoading } from '../feature/loading/loadingSlice'

export const clearReducers = (dispatch) => {
	dispatch(setInitialStateCategories())
	dispatch(setInitialStateIncomes())
	dispatch(setInitialStateLoading())
	console.log('here')
}

export const handleStateChange = (e, func) => {
	let object = {}
	object[e.target.id] = e.target.value
	func((prev) => ({ ...prev, ...object }))
}
