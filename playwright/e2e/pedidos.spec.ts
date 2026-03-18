import { test, expect } from '@playwright/test';

// yarn playwright test -> roda todos os testes
// yarn playwright test --ui -> roda todos os testes em modo interativo
// yarn playwright test --debug -> roda todos os testes em modo debug
// yarn playwright codegen http://localhost:5173/ -> gera o código base para o teste

// AAA - Arrange, Act, Assert - Preparar, Agir, Verificar

// Javascript é assíncrono, por isso precisamos usar async/await
// Se tirarmos o await, todos os testes serão executados em paralelo, ao mesmo tempo


// page é a aba do navegador, ela é criada automaticamente pelo Playwright
// o page está aqui atraves de uma injeção de dependência
test('deve consultar um pedido aprovado', async ({ page }) => {
    
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

    // como seria o mesmo xpath - //label[text()='Número do Pedido']/../input o playwright deixa mais legivel
    // outra opção -  input[name='order-id'].fill('VLO-T0PGRW') seletor css
    await page.getByRole('textbox', { name: 'Número do Pedido' }).click();
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-T0PGRW');

    //await page.getByTestId('search-order-button').click();
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    // Checkpoint
    await expect(page.getByText('Pedido', { exact: true })).toBeVisible();

    //Assert
    // await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10000});
    // await expect(page.getByTestId('order-result-id')).toContainText('VLO-T0PGRW');
    await expect(page.getByText('VLO-T0PGRW')).toBeVisible();

    // await expect(page.getByTestId('order-result-status')).toBeVisible();
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
    await expect(page.getByText('APROVADO')).toBeVisible();
});