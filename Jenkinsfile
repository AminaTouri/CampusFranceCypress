pipeline {
  agent any

  tools {
    nodejs 'NodeJS' // <- Assure-toi que ce nom correspond à ce que tu as défini dans Jenkins
  }

  stages {
    stage('Cloner le projet') {
      steps {
        git 'https://ton-repo.git' // ou chemin local
      }
    }

    stage('Installer les dépendances') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lancer les tests Cypress') {
      steps {
        sh 'npx cypress run'
      }
    }
  }

  post {
    always {
      echo 'Test terminé'
    }
  }
}
