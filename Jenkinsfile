pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'mmnassri'
        DOCKER_IMAGE = "${DOCKER_USERNAME}/madrasati-frontend"
        CONTAINER_NAME = 'e-learningFrontCont'
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/MohamedAmineM/e-learningProject.git', branch: 'main'
            }
        }

        stage('Build Docker Image and Push to DockerHub') {
            steps {
                dir('madrasatiFront') {
                    script {
                        echo "======= Building and pushing frontend Docker image ======="

                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub_cred',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {
                            // Build frontend image (Angular)
                            bat "docker build -t %DOCKER_USER%/madrasati-frontend ."

                            // Login to Docker Hub
                            bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"

                            // Push image to Docker Hub
                            bat "docker push %DOCKER_USER%/madrasati-frontend"
                        }
                    }
                }
            }

            post {
                always {
                    
                    // Docker logout on Windows agent
                    bat 'docker logout'
                }
                success {
                    echo "✅ Push image execution SUCCESS"
                }
                failure {
                    echo "❌ Push image execution FAILED"
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

                    // Create network if not exists
                    bat 'docker network inspect my-network >nul 2>&1 || docker network create my-network'

                    // Run new container
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
