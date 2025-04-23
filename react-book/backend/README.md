# Pathfinder Back-end

This is the back-end server for the Pathfinder application.

Run with `npm start`

## Available Endpoints

- GET `/api/items` returns all the items for Code Café
- `/api/orders` is a RESTful interface for orders
    - GET `/api/orders` returns all the orders
    - POST `/api/orders` creates an order
    - DELETE `/api/orders` deletes all the orders
    - GET `/api/orders/:id` return one order
    - PUT `/api/orders/:id` updates an order
    - DELETE `/api/orders/:id` deletes one order
- `/api/auth` is an interface for authenticating users
    - GET `/api/auth/current-user` returns the currently logged-in user or `{}` if no user is logged in
    - POST `/api/auth/login` with username and password as the JSON body logs in a user and returns 401 if the login is invalid
    - POST `/api/auth/logout` logs out a user
