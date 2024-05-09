# Wage-access-platform-web

### Description 🧾

Wage access platform that enables employees to request early access to earned wages. This challenge covers creating a backend service to process these requests, a frontend interface for user interactions, and basic deployment using Docker.

### Requirements ⚙️

- Node.js (v18 or later)
- Npm
- PostgreSQL
- Docker installed and running

### Run project 🏃🏻‍♂️

`docker-compose up frontend backend db`

### Run only frontend App 🖥️

`cd frontend && npm run dev` it will run on http://localhost:8080

### Run only backend App 🎒

`cd backend && npm run start` it will run on http://localhost:3000

### Run local Database 💾

- Create a database named wage_access_platform.
- Configure the database credentials in the backend/src/db.ts file.

### Brief explanation of solution.

### Future features 🚀

- Create registration flow with JWT
- Separate style by components
- Build API provider to reuse our endpoints
- Implement Middleware to protect our endpoints
- Add Unit testing/Integration
- Add another framework in the backend like Nest.js to create models and have other security rules to use it!
- Add another type of conversion of balance more optimized.
- Improve the security of the database
- Set environment variables with sensitivity data

### Preview 📷

![scheme model](preview.jpg)

### Scheme Model 📷

![scheme model](scheme-model.jpg)
