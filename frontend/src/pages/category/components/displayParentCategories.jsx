import { Paper, Typography } from '@mui/material'
import { highlightSelected } from '../../../utils/styleFunctions'

export const DisplayParentCategories = (props) => {
	const { item, index, selected, setSelected } = props

	return (
		<div>
			<Paper
				sx={(theme) => ({
					margin: 2,
					padding: 1,
					paddingLeft: 3,
					background: highlightSelected(selected?.index, index, theme, 'default'),
				})}
				onClick={() => setSelected({ index, item })}>
				<Typography>{item.title}</Typography>
			</Paper>
		</div>
	)
}
