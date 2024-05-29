const session = require('express-session')
const Keycloak = require('keycloak-connect')

// Keycloak configuration object
const keycloakConfig = {
	clientId: 'mern-budget-client',
	bearerOnly: true,
	serverUrl: 'http://localhost:8080',
	realm: 'mern-budget',
	realmPublicKey: process.env.KEYCLOAK_SECRET,
}

const memoryStore = new session.MemoryStore()

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)

const setupKeycloak = (app) => {
	app.use(
		session({
			secret: 'some secret',
			resave: false,
			saveUninitialized: true,
			store: memoryStore,
		}),
	)

	app.use(keycloak.middleware())
}

module.exports = {
	keycloak,
	setupKeycloak,
}
