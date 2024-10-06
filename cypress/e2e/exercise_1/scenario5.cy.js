/*
-	Go to IMDb.com, unfold the Menu button and navigate to the Born today section;
 delete default search, then unfold Birth date and search for Celebrities born 
 the same day as today but exactly 40 years ago, 
 using the date picker for the “from” option and the string field 
 for the “to” option. Now on the 1st result in the list, 
 click on the 1st link you can find on the description (if any) 
 and take a screenshot.
 */

describe('IMDb Born Today Test', () => {
    const viewports = [
        { device: '(375x667)', width: 375, height: 667 }, // <1024
        { device: '(1024x800)', width: 1024, height: 800 } //>1024
    ]
    viewports.forEach((viewport) => {
        it(`Should search for celebrities born 40 years ago today and take a screenshot of the first result on ${viewport.device}`, () => {
        
            // Set viewport for each test 
            cy.viewport(viewport.width, viewport.height)

            // Visit IMDb.com
            cy.visit('/') //baseUrl is already set
            
            // Decline cookies
            cy.get('[data-testid="reject-button"]').click()

            // Check if we need to handle the responsive menu for differents size devices
            if (viewport.width < 1024) {
                // Unfold the menu on device1
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.get('[aria-label="Expand Celebs Nav Links"]').click() // Unfold Celebs section 
                cy.contains('Born Today').click() // Go to Born Today
                cy.get('[class="sc-d1bbe268-0 eZzkdn ipc-chip ipc-chip--on-base"]').click() // Delete default search for today's celebrities by class
            }else{
                // Unfold the menu on device2
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.contains('Born Today').click() // Go to Top 250 TV Shows  
                cy.get('[class="sc-d1bbe268-0 eZzkdn ipc-chip ipc-chip--on-base"]').click() // Delete default search for today's celebrities by class
                // Unfold the Birthday search filter 
                cy.get('[data-testid="accordion-item-birthDateAccordion"]').click()    
            }

            // Verify we are on the correct page by the URL
            cy.url().should('include', '/search/name')

            // Select the date in the date picker
            const today = new Date()
            const year_minus_40 = today.getFullYear() - 40 // Subtract 40 years
            const month = String(today.getMonth() + 1).padStart(2, '0') // Add 1 because getMonth() starts at 0
            const day = String(today.getDate()).padStart(2, '0')
            const date = `${year_minus_40}-${month}-${day}`

            // First textbox
            cy.get('[data-testid="birthDate-start"]').type(date)
            cy.wait(2000)
            // Second texbox
            cy.get('[data-testid="birthDate-end"]').type(date)
            cy.wait(2000)
            // Search results to load
            cy.get('[data-testid="adv-search-get-results"]').click()
            cy.wait(2000)
            //Click on the first name in the list of results
            cy.get('.ipc-metadata-list-summary-item').eq(0)
            .find('.ipc-html-content-inner-div')
            .eq(0)  
            .click({ force: true })

            // Take a screenshot of the page
            cy.screenshot("SCENARIO5_screenshot_of_the_page_Celebrity_Born_Yesterday_3rditem")

        })
    })    
  })
  