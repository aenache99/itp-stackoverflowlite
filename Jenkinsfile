pipeline {
    agent any

    environment {
        // Define any environment variables you might need
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls down the latest code from the repository
                checkout scm
            }
        }

        stage('Build Client and Server') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Execute tests (modify this according to how you run tests)
                    sh 'docker-compose run server npm test'
                    sh 'docker-compose run client npm test'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    // Push your containers to a registry (Docker Hub, AWS ECR, etc.)
                    // Remember to login first if pushing to Docker Hub or any other registry
                    sh '''
                        docker push user/repo:server-tag
                        docker push user/repo:client-tag
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Here you can add your deploy steps. This is a placeholder.
                    echo "Deploying..."
                }
            }
        }
    }

    post {
        always {
            // This will always run after the pipeline completes
            echo 'Pipeline finished!'
        }
        failure {
            // This will only run if the pipeline failed
            echo 'Something went wrong...'
        }
    }
}
