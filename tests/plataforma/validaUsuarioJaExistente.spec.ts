import { test, expect } from '@playwright/test';
import { envConfig } from '../../playwright.config';

test('test', async ({ page }) => {
  const variables = envConfig.variables;
  await page.goto(variables.plataformaUrl);
  await page.getByRole('link', { name: 'Criar Conta' }).click();
  await page.getByText('Cadastro para proprietários').click();
  await page.getByRole('textbox', { name: 'Código InstaCasa *' }).click();
  await page.getByRole('textbox', { name: 'Código InstaCasa *' }).fill('12345');
  await page.getByRole('textbox', { name: 'Nome *', exact: true }).click();
  await page.getByRole('textbox', { name: 'Nome *', exact: true }).fill('Proprietário');
  await page.getByRole('textbox', { name: 'Nome *', exact: true }).press('Tab');
  await page.getByRole('textbox', { name: 'Sobrenome *' }).fill('Teste');
  await page.getByRole('textbox', { name: 'Sobrenome *' }).press('Tab');
  await page.getByRole('textbox', { name: 'CPF *' }).click();
  await page.getByRole('textbox', { name: 'CPF *' }).fill('843.666.940-18');
  await page.getByRole('textbox', { name: 'CPF *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Telefone *' }).fill('(48)99999-9999');
  await page.getByRole('textbox', { name: 'Telefone *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email *' }).fill('devops@instacasa.com.br');
  await page.getByRole('button', { name: 'Avançar' }).click();
  await expect(page.getByText('Usuário já existente. Favor fazer login.', { exact: true })).toBeVisible();
});