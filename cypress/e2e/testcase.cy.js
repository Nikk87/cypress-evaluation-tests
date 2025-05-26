describe('NopCommerce Admin and Customer Test Suite', () => {

  // Admin Login
  it('Admin Login with valid credentials', () => {
    cy.visit('https://admin-demo.nopcommerce.com/login');
    cy.get('#Email').clear().type('admin@yourStore.com');
    cy.get('#Password').clear().type('admin');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/admin');
    cy.contains('Dashboard').should('be.visible');
  });

  // Add a new product as Admin
  it('Admin adds a new product', () => {
    // Login
    cy.visit('https://admin-demo.nopcommerce.com/login');
    cy.get('#Email').clear().type('admin@yourStore.com');
    cy.get('#Password').clear().type('admin');
    cy.get('button[type="submit"]').click();

    // Navigate to Products
    cy.get('.nav-sidebar').contains('Catalog').click();
    cy.get('.nav-item').contains('Products').click();

    // Add product
    cy.get('a[href="/Admin/Product/Create"]').click();
    cy.get('#Name').type('Test Product');
    cy.get('#ShortDescription').type('This is a test product.');
    cy.get('#FullDescription').type('Full description for the test product.');
    cy.get('#Price').clear().type('99.99');
    cy.get('button[name="save"]').click();

    // Assertion
    cy.contains('The new product has been added successfully').should('be.visible');
  });

  // Customer Login
  it('Customer login with valid credentials', () => {
    cy.visit('https://demo.nopcommerce.com/login');
    cy.get('#Email').type('testuser@demo.com'); // Replace with real email
    cy.get('#Password').type('testpassword');   // Replace with real password
    cy.get('button.login-button').click();
    cy.contains('My account').should('be.visible');
  });

  // Customer adds a product to cart
  it('Customer adds product to cart', () => {
    cy.visit('https://demo.nopcommerce.com/');
    cy.contains('Build your own computer').click();
    cy.get('#add-to-cart-button-1').click();
    cy.get('.bar-notification').should('contain', 'The product has been added to your shopping cart');
  });

  // Customer completes checkout
  it('Customer completes checkout process', () => {
    cy.visit('https://demo.nopcommerce.com/');
    cy.contains('Build your own computer').click();
    cy.get('#add-to-cart-button-1').click();

    // Open cart and proceed to checkout
    cy.get('.cart-label').click();
    cy.get('#termsofservice').check();
    cy.get('#checkout').click();

    // Assert that checkout page is loaded
    cy.url().should('include', 'checkout');
    cy.contains('Billing address').should('be.visible');
  });

});
