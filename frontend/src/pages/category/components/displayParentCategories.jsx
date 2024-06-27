import { Paper, Typography } from '@mui/material'
import { highlightSelected } from '../../../utils/styleFunctions'

export const DisplayParentCategories = (props) => {
	const { selected, setSelected, parentCategories } = props

	return parentCategories.map((item, index) => {
		return (
			<div key={`${item.title}-${index}`}>
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
	})
}
