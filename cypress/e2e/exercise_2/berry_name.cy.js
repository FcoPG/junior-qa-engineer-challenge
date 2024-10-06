
describe('PokéAPI Berry Endpoint Tests', () => {
  
    const baseUrl = 'https://pokeapi.co/api/v2/berry'
  
    // Test 1: Valid Berry name Test
    it('should return a valid response when calling with a valid berry name', () => {
      const validBerryName = "iapapa" // valid berry name 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBerryName}`, // Request to /berry/validBerryName 
        failOnStatusCode: false // Manage failures manually Prevents non-2xx responses
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200)
  
        // Assert expected name from the body 
        expect(response.body).to.have.property('name');
        expect(response.body.name).to.eq(validBerryName); 
      })
    })
  
    // Test 2: Invalid Berry name Test
    it('should return an error when calling with an invalid berry name', () => {
      const invalidBerryName = "francisco" // non-existent name 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${invalidBerryName}`,
        failOnStatusCode: false // Manage failures manually Prevents non-2xx responses
      }).then((response) => {
        // Assert that the response returns a 404 status code
        expect(response.status).to.eq(404)
      
      })
    })
  
  })
  