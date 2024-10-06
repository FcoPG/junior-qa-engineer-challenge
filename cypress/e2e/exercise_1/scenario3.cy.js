/*
-	Go to IMDb.com, unfold the Menu button, and navigate to the Top 250 TV Shows section; 
then click on Breaking Bad, go to the Photos, display only Danny Trejo's photos, 
and then click on the 2nd photo in the list.

*/

describe('IMDb test for Top 250 TV Shows and Photos of Danny Trejo', () => {
      
    const viewports = [
        { device: '(375x667)', width: 375, height: 667 }, // <1024
        { device: '(1024x800)', width: 1024, height: 800 } //>1024
    ]
    viewports.forEach((viewport) => {
        it(`Navigates to Top 250 TV Shows, selects Breaking Bad, and interacts with Danny Trejo photos on ${viewport.device}`, () => {
            
            // Set viewport for each test 
            cy.viewport(viewport.width, viewport.height)

            // Visit IMDb homepage
            cy.visit('/') //baseUrl is already set

            // Decline cookies
            cy.get('[data-testid="reject-button"]').click()

            // Check if we need to handle the responsive menu for differents size devices
            if (viewport.width < 1024) {
                // Unfold the menu on device1
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.get('[aria-label="Expand TV Shows Nav Links"]').click() // Unfold TV Shows section 
                cy.contains('Top 250 TV Shows').click() // Go to Top 250 TV Shows
               
            }else{
                // Unfold the menu on device2
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.contains('Top 250 TV Shows').click() // Go to Top 250 TV Shows                
            }
            
            // Verify we are on the correct page by  the URL
            cy.url().should('include', '/chart/toptv')
        
            // Click on "Breaking Bad"
            cy.get('.ipc-title__text').contains('Breaking Bad').click()

            // Navigate to the "Photos" section
            cy.get('[data-testid="hero__photo-link"]').click()
            
            // Navigate to the "Photos/gallery" section 
            cy.get('[data-testid="mv-gallery-button"]').click()

            // Navigate to the Filter the photos  
            cy.get('[data-testid="image-chip-dropdown-test-id"]').click()

            // Select only Danny Trejo's photos
            cy.get('[data-testid="select-dropdown-test-id"]').eq(0).select('nm0001803')
            cy.wait(2000)

            // Close the filter
            cy.get('[data-testid="promptable__x"]').click()

            // Click on the second photo in the list      
            cy.get('[data-testid="image-gallery-image"]') // Select all images with this test id
            .eq(1) // Select the second image 
            .click()

        })
    })
  })
  
