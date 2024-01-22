/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')
    })

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

    // it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    //     cy.get('#firstName').type('João')
    //     cy.get('#lastName').type('Monteiro')
    //     cy.get('#email').type('joaomonteiroop@gmail.com')
    //     cy.get('#phone-checkbox').click()
    //     cy.get('#open-text-area').type('test')
    //     cy.get('button[type="submit"]').click()

    //     cy.get('.error').should('be.visible')

    // })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {



        cy.get('#firstName').type('João').should('have.value', 'João').clear().should('have.value', '');
        cy.get('#lastName').type('Monteiro').should('have.value', 'Monteiro').clear().should('have.value', '');
        cy.get('#email').type('joaomonteiroop@gmail.com').should('have.value', 'joaomonteiroop@gmail.com').clear().should('have.value', '');
        cy.get('#phone').type(999999999).should('have.value', '999999999').clear().should('have.value', '');

        cy.get('button[type="submit"]').click()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })


    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Selecionando em campos de seleção suspensa
    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.selectFromValue()
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Selecionando inputs do tipo radio

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]').check('feedback').should('be.checked')
    })

    it('marca cada tipo de atendimento', function () {

        //fazendo de forma braçal
        // cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked')
        // cy.get('input[type="radio"][value="elogio"]').check().should('be.checked')
        // cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')

        //forma mais inteligente

        cy.get('input[type="radio"]')
            .check()
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    //Marcando e desmarcando input do tipo checkbox

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type=checkbox]')
            //.as('checkboxes')
            .check()
            // ---- outra forma de fazer
            .each(i => {
                cy.get(i).should('be.checked')
            })
        cy.get('input[type="checkbox"]').last().uncheck()
            .should('not.be.checked')

        // cy.get('@checkboxes')
        //     .each(checkbox => {
        //         expect(checkbox[0].checked).to.equal(true)
        //     })

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Monteiro')
        cy.get('#email').type('joaomonteiroop@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    //fazendo o upload de arquivos no cypress
    //Tal teste deve verificar que, após a seleção do arquivo, o nome correto do arquivo é persistido no objeto de "files" do "input"
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should( input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action:"drag-drop" })
            .should( input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should( input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    //lidando com links que abrem em outra aba
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {

        //o cypress não sabe lidar com páginas abertas em novas abas
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        //Verificando se esse texto está visível na nova aba
        cy.contains('Talking About Testing').should('be.visible')
    })
    
    
    it('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })

    //Simulando o viewport de um dispositivo móvel

    it.only('', () => {
        
    })

})
