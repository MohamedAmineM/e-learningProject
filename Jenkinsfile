pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mmnassri/madrasati-frontend'
        CONTAINER_NAME = 'e-learningFrontCont'
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/MohamedAmineM/e-learningProject.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('madrasatiFront') {  //  'madrasatiFront' is the correct directory!
                    script {
                        bat "docker build -t ${DOCKER_IMAGE}:latest ."
                    }
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    echo "🚀 Starting Docker container for Angular frontend..."

                    // Stop and remove old container if it exists
                    bat "docker stop ${CONTAINER_NAME} || exit 0"
                    bat "docker rm ${CONTAINER_NAME} || exit 0"

                    // Check if network (my-network) exists; if not, create it
                    bat 'docker network inspect my-network >nul 2>&1 || docker network create my-network'

                    // Run the new container (expose port 3000 on host to port 80 inside the container)
                    bat "docker run -d --name ${CONTAINER_NAME} --network my-network -p 3000:80 ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Check Running Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Angular frontend container built and running!'
        }
        failure {
            echo '❌ Something went wrong during the frontend pipeline.'
        }
    }
}
