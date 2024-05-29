const addUserToRequest = (req, res, next) => {
	if (req.kauth && req.kauth.grant) {
		const tokenContent = req.kauth.grant.access_token.content
		req.user = {
			id: tokenContent.sub,
			username: tokenContent.preferred_username,
			email: tokenContent.email,
		}
	}
	next()
}

module.exports = addUserToRequest
