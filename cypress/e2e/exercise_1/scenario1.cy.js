/*
Go to IMDb.com, search for Nicolas Cage and access his profile; 
then unfold the Upcoming tab in the Credits section, and click on the first movie with a Completed tag. 
We want to make sure that this scenario is working on Chrome and Firefox.
*/

describe('IMDb Automation - Scenario 1', () => {
      
    const viewports = [
        { device: '(375x667)', width: 375, height: 667 }, // <1024
        { device: '(1024x800)', width: 1024, height: 800 } //>1024
    ]
    viewports.forEach((viewport) => {

        it(`Search for Nicolas Cage and navigate to the first completed movie in  upcoming credits on ${viewport.device}`, () => {

             // Set viewport for each test 
             cy.viewport(viewport.width, viewport.height)

            // Visit IMDb homepage
            cy.visit('/') //baseUrl is already set
            
            //Decline cookies
            cy.get('[data-testid="reject-button"]').click()
            
            // Check if we need to handle the responsive menu for differents size devices
            if (viewport.width < 1024) {
                // Unfold the menu on device1
                cy.get('#imdbHeader-searchOpen').click() // Search bar
                cy.get('[aria-label="Search IMDb"]').should('be.visible') // Search bar is visible
                cy.get('[aria-label="Search IMDb"]').type('Nicolas Cage').type('{enter}')
               
            }else{
                // Search Nicolas Cage by ID
                cy.get('#suggestion-search').type('Nicolas Cage')
                cy.get('#suggestion-search-button').click()                
            }
        
            // Click on Nicolas Cage profile link from the search results
            cy.contains('Nicolas Cage').click()
                
            // Unfold the Upcoming section in the Credits
            cy.get('[data-testid="nm-flmg-all-accordion-expander"]').click()
        
            // Click on the first movie with Completed status By Class
            cy.get('.ipc-metadata-list-summary-item__t').eq(0).click()

            // Assertions 
            // Check that the movie title is visible
            cy.get('[data-testid="hero__primary-text"]').should('be.visible')


        })
    })
  })
  