import { test, expect } from '@playwright/test';

import config from "../../../src/config";
import { loginAdmin } from '../../admin/loginAdmin';
import { deleteUsuario } from '../../../src/api/deleteUsuario';


const variables = config.getVariables();
test.describe('Cadastro de convidado', () => {
  test.beforeEach(async ({ page }) => {
    await loginAdmin(page, variables.adminURL);
    await page.waitForTimeout(3000); 
    const token = await page.evaluate(() => localStorage.getItem('token')) ?? '';
    await deleteUsuario('devops+e2econvidado@instacasa.com.br', token);
  });
  test('test', async ({ page, context }) => {
  //   test.setTimeout(120_000)

    await page.getByRole('menuitem', { name: 'Usuários' }).click();
    await page.getByRole('button', { name: 'Novo usuário' }).click();
    await page.getByText('Convidado').click();
    await page.getByRole('textbox', { name: 'Nome' }).click();
    await page.getByRole('textbox', { name: 'Nome' }).fill('Convidado Playwright E2E');
    await page.getByRole('textbox', { name: 'CPF' }).click();
    await page.getByRole('textbox', { name: 'CPF' }).fill('123.456.789-09');
    await page.getByRole('textbox', { name: 'Telefone' }).click();
    await page.getByRole('textbox', { name: 'Telefone' }).fill('(11)11111-11111');
    await page.getByRole('textbox', { name: 'E-mail' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill('devops+e2econvidado@instacasa.com.br');
    await page.getByRole('button', { name: 'Salvar' }).click();

    await page.getByRole('button', { name: 'Copiar código' }).click();
    await page.getByText('Copiado para a área de').isVisible();
    const clipboardCodigo = await page.evaluateHandle(() => navigator.clipboard.readText());
    const codigo = await clipboardCodigo.jsonValue();
    await expect(codigo).toBeDefined();

    await page.getByRole('button', { name: 'Copiar link' }).click();
    await page.getByText('Copiado para a área de').isVisible();
    const clipboardURL = await page.evaluateHandle(() => navigator.clipboard.readText());
    const url = await clipboardURL.jsonValue();
    await expect(url).toBe('https://dev-site.instacasa.com.br/cadastro/convidado');

  });
});