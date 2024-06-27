//Route Imports
const budgetRoutes = require('./budgetRoutes')
const categoryRoutes = require('./categoryRoutes')
const incomeRoutes = require('./incomeRoutes')
const parentCategoriesRoutes = require('./parentCategoriesRoutes')
const transactionRoutes = require('./transactionsRoutes')


const setupRoutes = (app, keycloak) => {
	// Routes
	app.use('/api/budget', keycloak.protect(), budgetRoutes)
	app.use('/api/category', keycloak.protect(), categoryRoutes)
	app.use('/api/income', keycloak.protect(), incomeRoutes)
	app.use('/api/parent-categories', keycloak.protect(), parentCategoriesRoutes)
	app.use('/api/transactions', keycloak.protect(), transactionRoutes)

}

module.exports = {
	setupRoutes,
}
