export const highlightSelected = (selected, index, theme, color) => {
	return index === selected
		? theme.palette.primary.main + '61'
		: theme.palette.background[color]
}
