pipeline {
  agent any

  tools {
    nodejs 'Node24'   // <- Assure-toi que ce nom correspond à ce que tu as défini dans Jenkins
  }

  stages {
    stage('Cloner le projet') {
      steps {
        git branch: 'main', url: 'https://github.com/AminaTouri/CampusFranceCypress.git'
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
