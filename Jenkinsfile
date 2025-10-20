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
                            // Build frontend image
                            bat "docker build -t ${DOCKER_IMAGE}:latest ."

                            // Login to Docker Hub
                            bat "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                            // Push image
                            bat "docker push ${DOCKER_IMAGE}:latest"
                        }
                    }
                }
            }

            post {
                always {
                    // Logout
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
    }

    post {
        success {
            echo '✅ Angular frontend image built and pushed!'
        }
        failure {
            echo '❌ Something went wrong during the frontend pipeline.'
        }
    }
}
