
describe('PokéAPI Berry Flavor Tests', () => {
  
    const baseUrl = 'https://pokeapi.co/api/v2'
    
    it('should get spicy flavor, get berries, find the one with the highest potency, and validate its details', () => {
      
      const flavorName = 'spicy' // We want to test the "spicy" flavor
  
      // Get the "spicy" berry flavor
      cy.request({
        method: 'GET',
        url: `${baseUrl}/berry-flavor/${flavorName}`,
        failOnStatusCode: false
      }).then((response) => {
        // Assert the response 200 is successful
        expect(response.status).to.eq(200)
  
        // Extract the list of berries from the body response
        const berries = response.body.berries
  
        // Assert that we have an array of berries
        expect(berries).to.be.an('array').and.not.to.be.empty
  
        // Find the berry with the highest potency
        var mostPotentBerry = berries[0] 
  
        berries.forEach((berry) => {
          if (berry.potency > mostPotentBerry.potency) {
            mostPotentBerry = berry
          }
        });
  
        // Assert that we have a most potent berry
        expect(mostPotentBerry).to.have.property('berry')
        expect(mostPotentBerry.berry).to.have.property('name')
  
        const berryName = mostPotentBerry.berry.name
  
        // Get the berry details using the berry name
        cy.request({
          method: 'GET',
          url: `${baseUrl}/berry/${berryName}`,
          failOnStatusCode: false
        }).then((berryResponse) => {
          // Assert the berry response 200 is successful
          expect(berryResponse.status).to.eq(200)
  
          // Step 6: Validate the berry name matches the one with the highest potency
          expect(berryResponse.body).to.have.property('name')
          expect(berryResponse.body.name).to.eq(berryName)
        })
      })
    })
  
  })
  