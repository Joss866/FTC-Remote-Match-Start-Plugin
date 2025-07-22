// --- IMPORTANT ---
// FTC Live needs to be running an event locally with the correct event id in the url, for these tests to work.

const FTC_LIVE_APP = 'http://192.168.0.67/event/4321/control/';
const BUTTON_TEXT_0 = 'Load Next Match';
const BUTTON_TEXT_1 = 'Show Preview';
const BUTTON_TEXT_2 = 'Show Match';
const BUTTON_TEXT_3 = 'Start Match';
const BUTTON_TEXT_4 = 'Commit & Post Last Match';

var chaiColors = require('chai-colors');    
chai.use(chaiColors);

describe('Keyboard Plugin Functionality on Local App', () => {
    beforeEach(() => {
    cy.visit(FTC_LIVE_APP);
    
    cy.get('input[id="usernameInput"]').type('local');
    cy.get('input[name="submit"]').click();
    });
  
  it('should not be able to click match buttons until match is loaded', () => {
    cy.contains(BUTTON_TEXT_0).as('loadMatchButton');
    cy.contains(BUTTON_TEXT_1).as('showPreviewButton');
    cy.contains(BUTTON_TEXT_2).as('showMatchButton');
    cy.contains(BUTTON_TEXT_3).as('startMatchButton');
    cy.contains(BUTTON_TEXT_4).as('commitButton');
    // Check Load Next Match button is in initial state.
    cy.get('@loadMatchButton').should('have.css', 'background-color')
    .and('be.colored', '#28a745') 
    
    // Check match buttons are disabled.
    cy.get('@showPreviewButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa')
    
    cy.get('@showMatchButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa') 
    
    cy.get('@startMatchButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa') 

    cy.get('@commitButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa') 
    
    // Click Load Match button.
    cy.get('@loadMatchButton').click()
    // Check Load Match button is disabled.
    cy.get('@loadMatchButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa') 

    // Check Commit button is still disabled
     cy.get('@commitButton').should('be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#f8f9fa') 

    // Check match buttons are enabled.
    cy.get('@showPreviewButton').should('not.be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#ffc107')
    
    cy.get('@showMatchButton').should('not.be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#ffc107') 
    
    cy.get('@startMatchButton').should('not.be.disabled')
    .and('have.css', 'background-color')
    .and('be.colored', '#dc3545')
  });
});