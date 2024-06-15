import { useTheme } from '@emotion/react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography,
} from '@mui/material'
import { highlightSelected } from '../../../utils/styleFunctions'

export const IncomeDisplayer = ({
	title,
	amount,
	index,
	selected,
	setSelected,
}) => {
	const theme = useTheme()

	return (
		<div style={{ marginBottom: 10 }}>
			{title && amount && (
				<Accordion
					disableGutters
					elevation={0}
					sx={{
						borderRadius: '5px',
						position: 'unset',
						border: `1px solid ${theme.palette.primary.main + '12'}`,
						background: theme.palette.background.default + '61',
					}}>
					<AccordionSummary
						sx={{
							borderRadius: '5px',
							backgroundColor: highlightSelected(selected, index, theme, 'contrast'),
						}}
						onClick={() => setSelected(index)}>
						<Grid container alignItems='center' justifyContent='space-between'>
							<Typography variant='body1' display='inline'>
								{title}
							</Typography>
							<Typography variant='body2' display='inline'>
								{amount}
							</Typography>
						</Grid>
					</AccordionSummary>
					<AccordionDetails>
						{/* budgets basic info maybe make loop for data*/}
						{/* Missing create api to grab incomes with basic info of budgets */}
						<Grid container alignItems='center' justifyContent='space-between'>
							<Typography variant='body1' display='inline'>
								{/* replace with data variable */} Missing
							</Typography>
							<Typography variant='body2' display='inline'>
								{/* replace with data variable */} data
							</Typography>
						</Grid>
					</AccordionDetails>
				</Accordion>
			)}
		</div>
	)
}
