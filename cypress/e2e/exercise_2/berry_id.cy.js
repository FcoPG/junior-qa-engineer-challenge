

describe('PokéAPI Berry Endpoint Tests', () => {
  
    const baseUrl = 'https://pokeapi.co/api/v2/berry'
  
    // Test 1: Valid Berry ID Test
    it('should return a valid response when calling with a valid berry ID', () => {
      const validBerryId = 1 // valid berry ID from 1 to 64
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${validBerryId}`, // Request to /berry/validBerryId
        failOnStatusCode: false // Manage failures manually Prevents non-2xx responses
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200)
  
        // Assert expected ID from the body contains
        expect(response.body).to.have.property('id')
        expect(response.body.id).to.eq(validBerryId) 
      });
    });
  
    // Test 2: Invalid Berry ID Test
    it('should return an error when calling with an invalid berry ID', () => {
      const invalidBerryId = 65 // non-existent ID from 65 
  
      cy.request({
        method: 'GET',
        url: `${baseUrl}/${invalidBerryId}`,
        failOnStatusCode: false // Manage failures manually Prevents non-2xx responses
      }).then((response) => {
        // Assert that the response returns a 404 status code
        expect(response.status).to.eq(404)
      
      })
    })
  
  })
  