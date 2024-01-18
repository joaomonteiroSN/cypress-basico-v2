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

    it('campo telefone permanece vazio se for preenchido com valor nao-numerico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('joaomonteiroop@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

        

        cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '');
        cy.get('#lastName').type('Monteiro').should('have.value', 'Monteiro').clear().should('have.value', '');
        cy.get('#email').type('joaomonteiroop@gmail.com').should('have.value', 'joaomonteiroop@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type(999999999).should('have.value', '999999999').clear().should('have.value', '');

        cy.get('button[type="submit"]').click()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    
    it.only('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
})
