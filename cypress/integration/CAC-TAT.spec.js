/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')
    });

    it('verifica o título da aplicação', function () {

        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {

        const longText = 'lorin loren loreanin loremaind lorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaindlorin loren loreanin loremaind'

        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('joaomonteiroop@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should("be.visible")
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {

        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('joaomonteiroopgmail.com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('campo telefone permanece vazio se for preenchido com valor nao-numerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
})
