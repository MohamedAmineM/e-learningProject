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
                stage('SonarQube Analysis') {
                    steps {
                        withCredentials([string(credentialsId: 'mmnassriSonarQube', variable: 'SONAR_AUTH_TOKEN')]) {
                            withSonarQubeEnv('mmnassriSonarQube') {
                                bat """
                                    "%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                                      -Dsonar.projectKey=e-learning ^
                                      -Dsonar.sources=. ^
                                      -Dsonar.host.url=http://localhost:9000 ^
                                      -Dsonar.login=%SONAR_AUTH_TOKEN%
                                """
                            }
                        }
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
