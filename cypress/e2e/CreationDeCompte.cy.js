// C’est une directive pour que l’éditeur reconnaisse les types Cypress.
/// <reference types="cypress" />

//sert à regrouper tous les tests dans une même suite de tests.
describe('Création de compte CampusFrance - Étudiants et Chercheurs', () => {
  beforeEach(() => {
    cy.visit('https://www.campusfrance.org/fr/user/register');
    cy.wait(2000);
  });

  // Charger les données depuis le fichier
  const utilisateurs = require('../fixtures/donnees.json');

  //On parcourt chaque utilisateur du fichier JSON avec forEach
  utilisateurs.forEach((utilisateur) => {
    //it correspond à un seul test fonctionnel et Pour chaque utilisateur, on crée un nom de test 
    it(`Remplit le formulaire pour ${utilisateur.VousEtes} : ${utilisateur.Prenom} ${utilisateur.Nom}`, () => {
      cy.get('input[placeholder="monadresse@domaine.com"]').should('be.visible').type(utilisateur.AdresseEmail);
      cy.get('#edit-pass-pass1').type(utilisateur.MotDePasse);
      cy.get('#edit-pass-pass2').type(utilisateur.ConfirmerMotDePasse);

      if (utilisateur.Civilite === 'Mr') {
        cy.get('label[for="edit-field-civilite-mr"]').click();
      } else if (utilisateur.Civilite === 'Mme') {
        cy.get('label[for="edit-field-civilite-mme"]').click();
      }

      cy.get('#edit-field-nom-0-value').type(utilisateur.Nom);
      cy.get('#edit-field-prenom-0-value').type(utilisateur.Prenom);

      cy.get('#edit-field-pays-concernes-selectized')
        .click()
        .type('{ctrl}a{backspace}')
        .type(`${utilisateur.PaysDeResidence}{enter}`);

      cy.get('#edit-field-nationalite-0-target-id').type(utilisateur.PaysDeNationalite);
      cy.get('#edit-field-code-postal-0-value').type(utilisateur.CodePostal);
      cy.get('#edit-field-ville-0-value').type(utilisateur.Ville);
      cy.get('#edit-field-telephone-0-value').type(utilisateur.Telephone);

      if (utilisateur.VousEtes === 'Étudiants') {
        cy.get('#edit-field-publics-cibles-2').click({ force: true });
      } else if (utilisateur.VousEtes === 'Chercheurs') {
        cy.get('#edit-field-publics-cibles-3').click({ force: true });
      }

      cy.get('#edit-field-domaine-etudes-selectized')
        .click()
        .type('{ctrl}a{backspace}')
        .type(`${utilisateur.DomaineEtudes}{enter}`);

      cy.get('#edit-field-niveaux-etude-selectized')
        .click()
        .type('{ctrl}a{backspace}')
        .type(`${utilisateur.NiveauEtude}{enter}`);

      cy.contains("J’accepte que mes données soient traitées pour recevoir des communications adaptées, de la part de Campus France.").should('be.visible');
    });
  });
  afterEach(() => {
  cy.wait(5000);
});

});
