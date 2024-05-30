//Route Imports
const budgetRoutes = require('./budgetRoutes')
const categoryRoutes = require('./categoryRoutes')
const incomeRoutes = require('./incomeRoutes')

const setupRoutes = (app, keycloak) => {
	// Routes
	app.use('/api/budget', keycloak.protect(), budgetRoutes)
	app.use('/api/category', keycloak.protect(), categoryRoutes)
	app.use('/api/income', keycloak.protect(), incomeRoutes)
}

module.exports = {
	setupRoutes,
}
