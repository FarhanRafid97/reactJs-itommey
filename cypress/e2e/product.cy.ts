describe('Navigation', () => {
  it('should Add New Product', () => {
    cy.visit('http://localhost:3000');

    cy.get('.button_add_product').click();

    cy.get('input[name=productName]').type('abcdef');
    cy.get('input[name=qty]').type('123');
    cy.get('input[name=expiredAt]').type('2009-12-12');
    cy.get('input[type=file]').selectFile('cypress/fixtures/pokemon.svg.png');
    cy.get('.showPictureInput');
    cy.get('#formProduct').submit();
    cy.get('.chakra-alert__title').should('have.text', 'Product Added!!');
    cy.get('.close_add_product').click();
  });

  it('should delete Product', () => {
    cy.visit('http://localhost:3000');
    cy.get('.edit_button_index_2').click();
    cy.get('input[name=productName]').clear().type('lifeboy updated');
    cy.get('form').submit();
    cy.get('.chakra-alert__title').should('have.text', 'Product Updated!!');
    cy.get('.close_update_product').click();
  });
  it('should Update Product', () => {
    cy.visit('http://localhost:3000');
    cy.get('.delete_button_index_2').click();
    cy.get('.delete_product_button').click();
    cy.get('.chakra-alert__title').should('have.text', 'Product Deleted!!');
  });
});
