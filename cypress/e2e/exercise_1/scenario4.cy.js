/*
-	Go to IMDb.com, unfold the Menu button and navigate to the Born today section; delete default search, 
then unfold Birthday and search for Celebrities born yesterday. 
Click on the 3rd name in the list and take a screenshot.

*/

describe('IMDb Automation - Born Today Section', () => {
    const viewports = [
        { device: '(375x667)', width: 375, height: 667 }, // <1024
        { device: '(1024x800)', width: 1024, height: 800 } //>1024
    ]
    viewports.forEach((viewport) => {
        it(`Navigates to the Born Today section, searches for celebrities born yesterday, and clicks the 3rd name on ${viewport.device}`, () => {
            
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
                cy.get('[aria-label="Expand Celebs Nav Links"]').click() // Unfold Celebs section 
                cy.contains('Born Today').click() // Go to Born Today
                cy.get('[class="sc-d1bbe268-0 eZzkdn ipc-chip ipc-chip--on-base"]').click() // Delete default search for today's celebrities by class
            }else{
                // Unfold the menu on device2
                cy.get('#imdbHeader-navDrawerOpen').click() // Unfold menu
                cy.contains('Born Today').click() // Go to Top 250 TV Shows  
                cy.get('[class="sc-d1bbe268-0 eZzkdn ipc-chip ipc-chip--on-base"]').click() // Delete default search for today's celebrities by class
                // Unfold the Birthday search filter 
                cy.get('[data-testid="accordion-item-birthdayAccordion"]').click()
                    
            }

            // Verify we are on the correct page by the URL
            cy.url().should('include', '/search/name')
        
            cy.wait(2000)

            // Get yesterday Date from today date in formato MM-DD
            const today = new Date()
            const month = String(today.getMonth() + 1).padStart(2, '0') // ++ 1 why getMonth() devuelve un valor de 0 a 11
            
            today.setDate(today.getDate() - 1) // Restamos un día para obtener la fecha de ayer
            const yesterdayDay = String(today.getDate()).padStart(2, '0') // Aseguramos que el día tenga 2 dígitos
            const todayDate = '${month}-${day}' // Concatenamos el mes y el día
            const yesterdayDate = `${month}-${yesterdayDay}` // Concatenamos el mes y el día de ayer

            cy.get('[data-testid="birthday-input-test-id"]').type(yesterdayDate).type('{enter}') // Input 'yesterday' in the search box
            cy.get('[data-testid="adv-search-get-results"]').click() // click on see results 


            // Click on the 3rd name in the list
            cy.get('.ipc-title__text').eq(3).click()

            // Take a screenshot of the page
            cy.screenshot("SCENARIO4_screenshot_of_the_page_Celebrity_Born_Yesterday_3rditem")

        })
    })
})
