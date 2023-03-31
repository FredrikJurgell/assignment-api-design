# Resource URIs and their corresponding brief descriptions UserController
POST https://cscloud8-103.lnu.se/api-app/api/v1/user/login: Authenticates a user by checking if the provided credentials match those in the database. If authentication is successful, it returns an access token along with the user ID and a link to the user's profile.

POST https://cscloud8-103.lnu.se/api-app//api/v1/users/register: Registers a new user by creating a new instance of UserModel and saving it to the database. It also sends a POST request to any webhooks registered by other users, notifying them of the new user registration. The method returns the ID of the newly registered user and links to the user's profile and the list of all users.


# Resource URIs and their corresponding brief descriptions HookController

POST https://cscloud8-103.lnu.se/api-app/api/v1/webhook: This URI is used to register a webhook. The request body should contain the following parameters: username, password, email, webhookURL, and webhookSecretToken. The response will have a 201 status code and HATEOAS response body, indicating that the webhook has been registered successfully.


# Resource URIs and their corresponding brief descriptions CatchController

GET https://cscloud8-103.lnu.se/api-app/api/v1/catches - This endpoint returns all catches that the authenticated user has created.

GET https://cscloud8-103.lnu.se/api-app/api/v1/catches/:id - This endpoint returns a specific catch by ID, provided that the authenticated user has permission to access it.

POST https://cscloud8-103.lnu.se/api-app/api/v1/catches - This endpoint creates a new catch with the details passed in the request body.

PUT https://cscloud8-103.lnu.se/api-app/api/v1/catches/:id - This endpoint update a catch with the details passed in the request body.

PATCH https://cscloud8-103.lnu.se/api-app/api/v1/catches/:id - This endpoint partially updates an existing catch with the details passed in the request body.

DELETE https://cscloud8-103.lnu.se/api-app/api/v1/catches/:id - This endpoint deletes a catch.