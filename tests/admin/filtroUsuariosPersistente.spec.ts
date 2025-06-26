import { test, expect } from '@playwright/test';
import { deleteUsuario } from '../../src/api/deleteUsuario';
import { deleteLogin, loginAdmin } from './loginAdmin';

test.describe('Filtro de usuário persistente', () => {
  test.beforeAll(async () => {
    await deleteLogin();
  });

  test.beforeEach(async ({ page, context }) => {
    await loginAdmin(page, context);
  });

  test.afterAll(async () => {
    await deleteLogin();
  });

  test('Filtro de usuário persistente', async ({ page }) => {
    await page.getByRole('menuitem', { name: 'Usuários' }).click();
    await page.getByRole('button', { name: 'Filtros' }).click();
    await page.locator('#checkbox-Corretor').check();
    await page.getByRole('combobox', { name: 'Selecione o empreendimento' }).click();
    await page.getByRole('combobox', { name: 'Selecione o empreendimento' }).fill('insta');
    await page.getByRole('option', { name: '- InstaCasa' }).click();
    await page.getByRole('button', { name: 'Aplicar' }).click();
    await expect(page.getByTestId('filtercount')).toContainText('2');
    await page.getByRole('row', { name: 'Orlando Vitali Werner' }).getByRole('link').click();
    await page.locator('#main-content').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('menuitem', { name: 'Financiamentos' }).click();
    await page.getByRole('menuitem', { name: 'Usuários' }).click();
    await expect(page.getByTestId('filtercount')).toContainText('2');
  });
});