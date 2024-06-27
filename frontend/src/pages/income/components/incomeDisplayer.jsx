import { useTheme } from '@emotion/react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography,
} from '@mui/material'
import { highlightSelected } from '../../../utils/styleFunctions'

export const IncomeDisplayer = (props) => {
	const { incomes, selected, setSelected } = props
	const theme = useTheme()

	//on selectedIndex change grab info of income and show graphs about budgets and it it hitted the target or not

	return incomes.map((item, index) => {
		return (
			<div style={{ marginBottom: 10 }} key={`${item.title}-${index}`}>
				{item.title && item.amount && (
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
									{item.title}
								</Typography>
								<Typography variant='body2' display='inline'>
									{item.amount}
								</Typography>
							</Grid>
						</AccordionSummary>
					</Accordion>
				)}
			</div>
		)
	})
}
