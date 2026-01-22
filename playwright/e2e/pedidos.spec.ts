import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
    
    //Arrange
    await page.goto('http://localhost:5173/');
    //Checkpoint (faz parte do Arrange)
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    //a[text()='Consultar Pedido']
    //a[href='/lookup']
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    //Act
    await page.getByTestId('search-order-id').click();
    await page.getByTestId('search-order-id').fill('VLO-T0PGRW');
    await page.getByTestId('search-order-button').click();

    //Assert
    await expect(page.getByTestId('order-result-id')).toBeVisible();
    await expect(page.getByTestId('order-result-id')).toContainText('VLO-T0PGRW');

    await expect(page.getByTestId('order-result-status')).toBeVisible();
    await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});