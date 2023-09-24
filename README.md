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
9. Caching: Redis
10. Metrics: ElasticSearch and Kibana
11. CI/CD: Jenkins
12. Testing: Mocha/Chai and Selenium


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
