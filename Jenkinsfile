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
                        script {
                            withSonarQubeEnv('mmnassriSonarQube') {
                                withCredentials([string(credentialsId: 'sonar-token-2', variable: 'SONAR_AUTH_TOKEN')]) {
                                    bat """
                                        "${tool 'SonarQubeScanner'}/bin/sonar-scanner.bat" ^
                                        -Dsonar.projectKey=e-learning ^
                                        -Dsonar.sources=. ^
                                        -Dsonar.host.url=http://localhost:9000 ^
                                        -Dsonar.token=%SONAR_AUTH_TOKEN%
                                    """
                                    }
                                }
                            }
                    }
                }
            
                stage('Quality Gate') {
                        steps {
                            timeout(time: 1, unit: 'HOURS') {
                                waitForQualityGate abortPipeline: true
                            }
                        }
                    }





      /*  stage('Build Docker Image and Push to DockerHub') {
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

                             // 🔍 Scan image with Trivy via Docker
                            echo "======= Running Trivy scan (Docker-based) ======="
                            bat """
                            docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image  --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest
                            """

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
        }*/

        stage('Build Docker Image') {
            steps {
                dir('madrasatiFront') {
                    script {
                        echo "======= Building frontend Docker image ======="
                        bat "docker build -t ${DOCKER_IMAGE}:latest ."
                    }
                }
            }
        }

      /*  stage('Scan Docker Image with Trivy') {
            steps {
                dir('madrasatiFront') {
                    script {
                        echo "======= Running Trivy scan (HIGH & CRITICAL) ======="
                        bat """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest
                        """
                    }
                }
            }
        }*/

        stage('Push Docker Image to DockerHub') {
            steps {
                dir('madrasatiFront') {
                    script {
                        echo "======= Pushing frontend Docker image to DockerHub ======="
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'dockerhub_cred',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {
                            // Login to Docker Hub
                            bat "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"

                            // Push image
                            bat "docker push ${DOCKER_IMAGE}:latest"
                        }
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

                    // Create network if not exists
                    bat 'docker network inspect my-network >nul 2>&1 || docker network create my-network'

                    // Run new container
                    bat "docker run -d --name ${CONTAINER_NAME} --network my-network -p 3000:80 ${DOCKER_IMAGE}:latest"
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
