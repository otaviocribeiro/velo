import { test, expect } from '@playwright/test';

import { generateOrderCode } from '../support/helpers';

// yarn playwright test -> roda todos os testes
// yarn playwright test --ui -> roda todos os testes em modo interativo
// yarn playwright test --debug -> roda todos os testes em modo debug
// yarn playwright codegen http://localhost:5173/ -> gera o código base para o teste

// AAA - Arrange, Act, Assert - Preparar, Agir, Verificar

// Javascript é assíncrono, por isso precisamos usar async/await
// Se tirarmos o await, todos os testes serão executados em paralelo, ao mesmo tempo


// page é a aba do navegador, ela é criada automaticamente pelo Playwright
// o page está aqui atraves de uma injeção de dependência
test('deve consultar um pedido aprovado ATÉ AULA DESAFIO', async ({ page }) => {
    
    // await serve para dizer, espere isso temrminar antes de continuar
    //Arrange
    await page.goto('http://localhost:5173/');
    //Checkpoint (faz parte do Arrange)
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    //a[text()='Consultar Pedido']
    //a[href='/lookup']
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    //Act
    //await page.getByTestId('search-order-id').click();
    //await page.getByTestId('search-order-id').fill('VLO-T0PGRW');

    // como seria o mesmo xpath - //label[text()='Número do Pedido']/../input pega o label com o texto, vai por pai e depois vai pro "irmão"
    // outra opção -  input[name='order-id'].fill('VLO-T0PGRW') seletor css
    // este localizador faz a mesma coisa que o xpath acima, mas é mais legivel
    // page.getByLabel('Número do Pedido')
    // page.getByPlaceholder('Ex: VLO-ABC123')
    await page.getByRole('textbox', { name: 'Número do Pedido' }).click();
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-T0PGRW');

    //await page.getByTestId('search-order-button').click();
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // Checkpoint
    await expect(page.getByText('Pedido', { exact: true })).toBeVisible();

    //Assert
    // await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000});
    // ele não ficar 10s parado, tem até 10s para encontrar o elemento
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-T0PGRW');
    // //p[text()="Pedido"]/..//p[text()="VLO-T0PGRW"] se não tiver testID
     
    // const containerPedido = page.getByRole('paragraph')
    //     .filter({hasText: /^Pedido$/}) //expressão regular, começa e termina com "Pedido"
    //     .locator('..')

    // await expect(containerPedido).toContainText('VLO-T0PGRW');

    //await expect(page.getByText('VLO-T0PGRW')).toBeVisible();

    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
    // await expect(page.getByText('APROVADO')).toBeVisible();
});

test.describe("Consultar Pedido", () => {

    // test.beforeAll(async () => {
    //     console.log('beforeAll: roda uma vez antes de todos os testes.')
    // });
      
    test.beforeEach(async ({page}) => {
        console.log('beforeEach: roda antes de cada teste.')

        await page.goto('http://localhost:5173/');
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    });
      
    // test.afterEach(async () => {
    //     console.log('afterEach: roda depois de cada teste.')
    // });
      
    // test.afterAll(async () => {
    //     console.log('afterAll: roda uma vez depois de todos os testes.')
    // });

    test('deve consultar um pedido aprovado', async ({ page }) => {

        //Test Data
        const order = 'VLO-T0PGRW'
        
        //Arrange
        //beforeEach
    
        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();
    
        // //Assert
        // await expect(page.getByTestId('order-result-id')).toContainText(order);
    
        // await expect(page.getByTestId('order-result-status')).toBeVisible();
        // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
        await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order}
            - img
            - text: APROVADO
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: Lunar White
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: sport Wheels
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: Otávio Ribeiro
            - paragraph: Email
            - paragraph: otavio@ribeiro.com
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: À Vista
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);
    });
    
    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    
        //Test Data
        const order = generateOrderCode();
        
        //Arrange
        //beforeEach
    
        await page.getByRole('link', { name: 'Consultar Pedido' }).click();
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
    
        //Act
        await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
        await page.getByRole('button', { name: 'Buscar Pedido' }).click();
    
        //Assert
        //await expect(page.getByRole('heading', { name: 'Pedido não encontrado', level: 3})).toBeVisible();
    
        //await expect(page.getByText('Verifique o número do pedido e tente novamente')).toBeVisible();
        //const message =  page.locator('//p[text()="Verifique o número do pedido e tente novamente"]');
        //const message =  page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'});
        //await expect(message).toBeVisible();
        
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
            `);
    });
    
});