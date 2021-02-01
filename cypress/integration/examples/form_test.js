describe('Pizza Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

  const nameInput = () => cy.get('input[name="name"]')
  const sizeInput = () => cy.get('select[name="size"]')
  const pepperoniInput = () => cy.get('input[name="pepperoni"]')
  const baconInput = () => cy.get('input[name="bacon"]')
  const caramelizedOnionsInput = () => cy.get('input[name="caramelizedOnions"]')
  const mushroomsInput = () => cy.get('input[name="mushrooms"]')
  const textBoxInput = () => cy.get('textarea[name="specialInstructions"]')
  const pizzaBtn = () => cy.contains('Pizza?')
  const submitBtn = () => cy.contains('Add to Order!')

  it('sanity checks', () => {
    //assertion(s)
    expect(5).to.equal(5)
    expect(1 + 2).to.equal(3)
    expect({}).to.eql({})
    expect({}).to.not.equal({})
  })

  it('The text box exists and we can type in it', ()=> {
      pizzaBtn().click()
      textBoxInput()
      .should('exist')
      .type('Hello this is Shrek Id like extra sauce on mah pizza.')
  })

  it('Can select multiple toppings', () => {
      pizzaBtn().click()
      pepperoniInput().click()
      baconInput().click()
      caramelizedOnionsInput().click()
      mushroomsInput().click()

  })

  it('Can submit the form', () => {
    pizzaBtn().click()
    nameInput().type('Shrek the Ogre')
    sizeInput().select('large')
    pepperoniInput().click()
    baconInput().click()
    caramelizedOnionsInput().click()
    mushroomsInput().click()
    textBoxInput()
    .should('exist')
    .type('Hello this is Shrek Id like extra sauce on mah pizza.')
    submitBtn().click()
  })

})