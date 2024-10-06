/*-	Go to IMDb.com, unfold the Menu and navigate to the Top Box Office section; 
then click on the 2nd item on the Top box office list; then click on the IMDb Rating button, 
click on the Rate button, and set a 5 stars Rating and click on the Rate button in the modal.
*/

describe('IMDb Automation - Scenario 2', () => {

    const viewports = [
        { device: '(375x667)', width: 375, height: 667 }, // <1024
        { device: '(1024x800)', width: 1024, height: 800 } //>1024
    ]

    viewports.forEach((viewport) => {
        it(`Navigate to Top Box Office and rate the second item on ${viewport.device}`, () => {

            // Set viewport for each test 
            cy.viewport(viewport.width, viewport.height)

            // Visit IMDb homepage
            cy.visit('/') // baseUrl is already set

            // Decline cookies if present
            cy.get('[data-testid="reject-button"]').click()

            // Check if we need to handle the responsive menu for differents size devices
            if (viewport.width < 1024) {
                // Unfold the menu on device1
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.get('[aria-label="Expand Movies Nav Links"]').click() // Unfold movies
                cy.contains('Top Box Office').click() // Go to Top Box Office
               
            }else{
                // Unfold the menu on device2
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.contains('Top Box Office').click() // Go to Top Box Office
                
            }
            // Click on the 2nd  in the list
            cy.get('.ipc-title__text').eq(3).click()
            cy.wait(2000)

            // Click on the Rate button
            cy.get('div[data-testid="hero-rating-bar__user-rating__unrated"]').eq(0).click({ force: true })

            // Set a 5 stars Rating and click on the Rate button in the modal  
            cy.get('.ipc-starbar').should('be.visible')
            cy.get('.ipc-starbar__touch')
            .trigger('mouseover') // Simulate mouseover to unlock the stars
            .wait(500) // Wait for safety

            cy.get('.ipc-starbar__rating') // Find the star rating container
            .find('button') // Find the buttons inside the container
            .eq(4) // Select the 5th button
            .click({ force: true })

            // Click the "Rate" button
            cy.get('button.ipc-rating-prompt__rate-button').click()
        
        })
    })
})
