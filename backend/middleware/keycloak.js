const session = require('express-session')
const Keycloak = require('keycloak-connect')

// Keycloak configuration object
const keycloakConfig = {
	clientId: 'mern-budget-client',
	bearerOnly: true,
	serverUrl: 'http://localhost:8080',
	realm: 'mern-budget',
	//realmPublicKey: process.env.KEYCLOAK_SECRET_LOCAL,
	realmPublicKey: process.env.KEYCLOAK_KEY_CLUSTER,
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
			cookie: {
				secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
				//maxAge: 24 * 60 * 60 * 1000, // 24 hours
				maxAge: 1 * 60 * 1000, // 5 minutes
			},
		}),
	)

	app.use(keycloak.middleware())
}

module.exports = {
	keycloak,
	setupKeycloak,
}
