describe('IMDb Test Suite', () => {
  
    const viewports = [
        { device_mobile: '(375x667)', width: 375, height: 667 }, // <1024
        { device_Desktop: '(1024x800)', width: 1024, height: 800 } //>1024
    ]
    // beforeEach hook to visit the baseUrl (IMDb homepage) before each test
    beforeEach(() => {
      cy.visit('/'); // This uses the baseUrl set in cypress.config.js
    })


    viewports.forEach((viewport) => {

        //*** SCENARIO 1 ***/
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

        //*** SCENARIO 2 ***/
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

        //*** SCENARIO 3 ***/
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
        //*** SCENARIO 4 ***/
        it(`Navigates to the Born Today section, searches for celebrities born yesterday, and clicks the 3rd name ${viewport.device}`, () => {
            
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
            cy.screenshot("scenario4_screenshot_of_the_page_Celebrity_Born_Yesterday_3rditem")
    
        })


        //***SCENARIO 5 ***/
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