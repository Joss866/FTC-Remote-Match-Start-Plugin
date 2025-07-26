// --- IMPORTANT ---
// FTC Live needs to be running an event locally with the correct event id in the url, for these tests to work.

const FTC_LIVE_APP = 'http://192.168.0.67/event/4321/control/';
const MANAGE_SERVER = 'http://192.168.0.67/manage/';
const BUTTON_TEXT_0 = 'Load Next Match';
const BUTTON_TEXT_1 = 'Show Preview';
const BUTTON_TEXT_2 = 'Show Match';
const BUTTON_TEXT_3 = 'Start Match';
const BUTTON_TEXT_4 = 'Commit & Post Last Match';
const RELOAD = 'Reload';

var chaiColors = require('chai-colors');
chai.use(chaiColors);

describe('Keyboard Plugin Functionality on Local App', () => {
  beforeEach(() => {
    cy.visit(FTC_LIVE_APP);

    cy.intercept('GET', '/event/4321/awards/list/').as('list');
    cy.intercept('GET', '/event/4321/awards/assignments/').as(
      'assignments'
    );
    cy.intercept(
      'GET',
      '/event/4321/awards/presentation_context/'
    ).as('context');
    cy.intercept('POST', '/event/4321/control/load/1/').as('control');
    cy.intercept('POST', '/event/4321/control/preview/1/').as(
      'previewMatch'
    );
    cy.intercept('POST', '/event/4321/control/showmatch/1/').as(
      'showMatch'
    );

    cy.get('input[id="usernameInput"]').type('local');
    cy.get('input[name="submit"]').click();
  });
  afterEach(() => {
    cy.visit(MANAGE_SERVER);
    cy.get('select[id="hideList"]').select('4321 - test');
    cy.contains('button', RELOAD).click();
  });

  it('should not be able to click match buttons until match is loaded', () => {
    cy.contains(BUTTON_TEXT_0).as('loadMatchButton');
    cy.contains(BUTTON_TEXT_1).as('showPreviewButton');
    cy.contains(BUTTON_TEXT_2).as('showMatchButton');
    cy.contains(BUTTON_TEXT_3).as('startMatchButton');
    cy.contains(BUTTON_TEXT_4).as('commitButton');
    // Check Load Next Match button is in initial state.
    cy.get('@loadMatchButton')
      .should('have.css', 'background-color')
      .and('be.colored', 'rgb(40, 167, 69)');

    // Check match buttons are disabled.
    cy.get('@showPreviewButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    cy.get('@showMatchButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    cy.get('@startMatchButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    cy.get('@commitButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    // Click Load Match button.
    cy.get('@loadMatchButton').click();
    cy.wait('@list');
    cy.wait('@assignments');
    cy.wait('@context');
    cy.wait('@control');

    // Check Load Match button is disabled.
    cy.get('@loadMatchButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    // Check Commit button is still disabled
    cy.get('@commitButton')
      .should('be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(248, 249, 250)');

    // Check match buttons are enabled.
    cy.get('@showPreviewButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(40, 167, 69)');

    cy.get('@showMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(40, 167, 69)');

    cy.get('@startMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(220, 53, 69)');

    // cy.get('body').focus().type('2');
    cy.get('body').trigger('keydown', { keyCode: 49 });
    cy.wait(500);
    cy.get('body').trigger('keyup', { keyCode: 49 }); // // Check match buttons are enabled.

    cy.get('@showPreviewButton').click();
    cy.wait('@previewMatch');
    cy.get('@showPreviewButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@showMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(40, 167, 69)');

    cy.get('@startMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(220, 53, 69)');

    cy.get('@showMatchButton').click();
    cy.wait('@showMatch');
    cy.get('@showPreviewButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@showMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@startMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(220, 53, 69)');

    cy.get('@startMatchButton').click();
    cy.get('@showPreviewButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@showMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.wait(5000);

    cy.contains('Abort Match')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(220, 53, 69)');

    cy.contains('Abort Match').click();

    cy.get('.modal-footer').contains('button', 'Abort').click();

    cy.get('@showPreviewButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@showMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(255, 193, 7)');

    cy.get('@startMatchButton')
      .should('not.be.disabled')
      .and('have.css', 'background-color')
      .and('be.colored', 'rgb(220, 53, 69)');
  });
});
