# StackOverflow Light Project (WIP as of now)
<a href="https://codeclimate.com/github/aenache99/itp-stackoverflowlite/maintainability"><img src="https://api.codeclimate.com/v1/badges/0a18c2c4d4243eb739f8/maintainability" /></a>

## Project Overview


This is a Stack Overflow clone project, as of now it is a work in progress.

Everything is pushed to Git except course for the environment variables. The environment variables are stored in a .env file in the backend directory. The .env file is not pushed to Git until the project is completed.

GCP link: TBA

It is built using the MERN stack as its core. The following full stack is as follows:

1. Databases: NoSQL (Serverless MongoDB)
2. Backend: Node.js, Express.js
3. Frontend: React.js, Axios, React Router
4. Authentication: Auth0
5. Realtime updates: Socket.io
6. Containerization and Orchestration: Docker, Docker Compose and Kubernetes
7. Deployment: Google Cloud Platform
8. Version Control: Git and GitHub
9. CI/CD: Jenkins
10. Testing: Mocha/Chai and Selenium


## How to Run This Project Locally
To run this project on your local machine, follow these steps:

PREREQUISITES:

- Create a MongoDB Atlas account and create a free M0 cluster. Then create a database user and get the connection string. You can follow this tutorial: https://www.youtube.com/watch?v=rPqRyYJmx2g
- Create an Auth0 account and create a new application. Then get the client ID and client secret. You can follow this tutorial: https://www.youtube.com/watch?v=Ou2f-cnL9S4
- Download and install Docker Desktop: https://www.docker.com/products/docker-desktop

1. Clone the repository to your local machine:
```bash
git clone https://github.com/aenache99/itp-stackoverflowlite.git
```
2. Navigate to the project directory:
```bash
cd itp-stackoverflowlite
```
3. Create a .env file in the server directory and add the following environment variables:
```bash
MONGO_URI=<your MongoDB connection string>
AUTH0_CLIENT_ID=<your Auth0 client ID>
AUTH0_CLIENT_SECRET=<your Auth0 client secret>
AUTH0_DOMAIN=<your Auth0 domain>
```
4. If it is the first time running the project, run the following command:
```bash
docker-compose up --build
```
5. After the first time, run the following command:
```bash
docker-compose up 
```
6. Navigate to http://localhost:3000/ to view the project.

Once you are done, you can stop the project by pressing CTRL+C in the terminal window where you ran the docker-compose command. Then run the following command to stop the containers:
```bash
docker-compose down
```
Let's overview the technologies used in this project:

1. Database: NoSQL (Serverless MongoDB):

Scalability: MongoDB is highly scalable, allowing the application to handle a large number of users and data without major changes to the database structure.

Flexibility: NoSQL databases are schema-less, providing flexibility in data modeling, which can be helpful when dealing with diverse user-generated content.

Ease of use: MongoDB Atlas is a fully managed database service, which means you don't have to worry about managing the database infrastructure. Though it comes with the usual disadvantages of a managed service, such as limited customization.

Easy scaling: MongoDB Atlas allows to easily scale the database, which is essential for a growing application.

2. Backend: Node.js, Express.js

Fast Execution: Node.js is known for its non-blocking, event-driven architecture, which can lead to fast and responsive backend services.

JavaScript Everywhere: Using JavaScript on both the frontend and backend allows for easier code sharing and maintenance.

Perfectly fit for the job: Since our Stack Overflow clone isn't CPU intensive, it nullifies the main drawback of Node.js, which is its poor performance in CPU-intensive tasks.

3. Frontend: React.js, Axios, React Router

Reusability: React's component-based architecture promotes the DRY approach, making it easier to develop and maintain complex user interfaces.

Routing: React Router simplifies client-side routing, enhancing the user experience by enabling single-page applications.

Efficiency: Axios simplifies making HTTP requests, making it easier to interact with the backend API.

Potential Mobile App: The frontend can be easily ported to React Native, allowing for a mobile app to be developed.

4. Authentication: Auth0

Security: Auth0 provides robust authentication and authorization features, helping to secure user data and access control.

Ease of Integration: Auth0 offers easy integration with various identity providers and social logins, reducing development time.

Completely managed: Auth0 is a fully managed service, which means you don't have to worry about managing the authentication infrastructure. Though it comes with the usual disadvantages of a managed service, such as limited customization.

Specialization: Auth0 specializes in authentication and authorization, which means they have a dedicated team working on improving the service.

5. Real-time Communication: Socket.io

Socket.io enables real-time bidirectional communication between the server and client, essential for a forum application.

6. Containerization and Orchestration: Docker, Docker Compose, and Kubernetes

Portability: Docker containers ensure consistent application behavior across different environments, making deployment and scaling more manageable.

Scalability: Kubernetes orchestrates container deployment and scaling, allowing for efficient resource management.

Ease of deployment: Docker Compose allows for easy deployment on a local machine.

7. Deployment: Google Cloud Platform

Scalability: GCP offers auto-scaling and load balancing, ensuring your application can handle traffic spikes.

Managed Services: GCP provides various managed services, reducing the operational overhead of maintaining infrastructure.

Ease of use of the OP: I have experience with GCP, so it was easier to deploy the application on GCP. Though that doesn't mean that AWS or Azure are not good options.

8. Version Control: Git and GitHub

Collaboration: Git and GitHub facilitate collaboration among developers, version tracking, and code review processes.

Ease of use: Git and GitHub are easy to use, making it easier for developers to contribute to the project.

Tracking Changes: Git and GitHub allow to track changes to the codebase, making it easier to debug issues and revert changes if needed.

Integration with CI/CD: Git and GitHub integrate well with CI/CD tools, allowing to automate the testing and deployment process.

GitHub Issues: GitHub Issues allow to track bugs and feature requests, making it easier to manage the project. Also, it plays well with Kanban boards like Trello.

9. CI/CD: Jenkins

Automation: Jenkins automates the testing and deployment process, ensuring consistent and reliable releases.

Customization: Jenkins offers a high degree of customization for CI/CD pipelines.

Local: Since it's local, we can easily test the application before deploying it to production.

10. Testing: Mocha/Chai and Selenium

Comprehensive Testing: Mocha and Chai are popular choices for writing unit and integration tests in JavaScript.

Browser Testing: Selenium allows to automate browser testing, ensuring cross-browser compatibility.

