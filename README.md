# StackOverflow Light Project (WIP as of now)

## Project Overview


This is a Stack Overflow clone project, as of now it is a work in progress.

Everything is pushed to Git except course for the environment variables. The environment variables are stored in a .env file in the backend directory. The .env file is not pushed to Git until the project is completed.

YouTube presentation link: TBA


It is built using the MERN stack as its core. The following full stack is as follows:

1. Databases: NoSQL (Serverless MongoDB) (RDBMS (Serverless Postgres) was dropped)
2. Backend: Node.js, Express.js
3. Frontend: React.js
4. Authentication: Auth0
5. Realtime updates: Socket.io
6. Containerization and Orchestration: Docker and Kubernetes
7. Deployment: Google Cloud Platform
8. Version Control: Git and GitHub
9. Caching: Redis
10. Metrics: ElasticSearch and Kibana
11. CI/CD: Jenkins
12. Testing: Jest and Selenium


## How to Run This Project Locally
To run this project on your local machine, follow these steps:

- Clone the repository to your local machine:
```bash
git clone https://github.com/aenache99/itp-stackoverflowlite.git

```
- Navigate to the project directory:
```bash
cd stack-overflow-clone

```
#### Install frontend dependencies
- Navigate to the frontend directory:
```bash
cd frontend
```

- Install dependencies:
```bash
npm install

```

#### Install backend dependencies
- Navigate to the backend directory:
```bash
cd backend

```

- Install dependencies:
```bash
npm install

```

### Usage
- Start the backend server
```bash
cd backend
npm start

```


- Start the frontend development server
```bash
cd frontend
npm run dev

```