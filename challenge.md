Coding Challenge: Wage Access Platform
Objective:
Build a simplified version of a wage access platform that enables employees to request early access to earned wages. This challenge covers creating a backend service to process these requests, a frontend interface for user interactions, and basic deployment using Docker.

Challenge Details:

1. Backend - Wage Access Transaction Processor:

- Develop RESTful APIs to handle wage data and access requests.
- Implement logic to:
- Calculate an employee's available balance.
- Process wage access requests, considering the employee's available balance.
- Use JSON for input/output (attached `sample_wage_data.json`), including employee details and request statuses.
- Suggested technologies: Node.js with Express.

2. Frontend:

- Create a simple web application for employees to:
- View their available balance.
- Submit requests for wage access.
- The interface should be user-friendly and responsive.
- Suggested technologies: React.

3. Database:

- Set up a basic database schema to store users, wage information, and requests.
- Please use PostgreSQL.

4. Deployment:

- Containerize the backend, frontend, and database using Docker.
- Provide a docker-compose file for easy local deployment.

Evaluation Criteria:
Functionality: The system correctly calculates balances and processes requests.
Code Quality: Clean, readable, and well-organized code.
User Experience: The frontend is intuitive and straightforward.
Deployment: Successful containerization and local deployment instructions.

Submission Instructions:

- Submit your code via GitHub, including all source files and Docker configurations.
- Include a README with setup instructions and a brief explanation of your solution.
