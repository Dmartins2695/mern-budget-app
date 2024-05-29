const Keycloak = require('keycloak-connect')
const session = require('express-session')

const memoryStore = new session.MemoryStore()

const kcConfig = {
	clientId: 'mern-budget-client',
	bearerOnly: true,
	serverUrl: 'http://localhost:8080/auth',
	realm: 'mern-budget',
	credentials: {
		secret: process.env.KEYCLOAK_SECRET,
	},
}

const keycloak = new Keycloak({ store: memoryStore }, kcConfig)

module.exports = {
	keycloak,
	memoryStore,
}
