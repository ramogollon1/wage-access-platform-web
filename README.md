# Wage-access-platform-web

### Description 🧾

Wage access platform that enables employees to request early access to earned wages. This challenge covers creating a backend service to process these requests, a frontend interface for user interactions, and basic deployment using Docker.

## Before you begin ⚙️

Before starting, ensure you have the following technologies installed:

- Node.js (v18 or later)
- Npm
- PostgreSQL
- Docker installed and running

## Commands to start

Run the following command from the root directory of the project:

### Prepare project to start 🍝

`npm run prepare`

### Run the project 🏃🏻‍♂️

`npm run start`

## Other commands

### Clean Project 🧹

`npm run docker-clean`

### Run only frontend App 🖥️

`npm run start-front` it will run on http://localhost:8080

### Run only backend App 🎒

`npm run start-backend` it will run on http://localhost:3000

## Preview 📷

![scheme model](https://github.com/ramogollon1/wage-access-platform-web/blob/main/preview.png)

## Scheme Model 📷

![scheme model](https://github.com/ramogollon1/wage-access-platform-web/blob/main/scheme-model.png)

## Future features 🚀

- Create registration flow with JWT
- Separate style by components
- Build API provider to reuse our endpoints
- Implement Middleware to protect our endpoints
- Add Unit testing/Integration
- Add another framework in the backend like Nest.js to create models and have other security rules to use it!
- Add another type of conversion of balance more optimized.
- Improve the security of the database
- Set environment variables with sensitivity data
