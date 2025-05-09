import { test, expect } from '@playwright/test';
import { deleteLogin, loginAdmin } from '../../admin/loginAdmin';
import { deleteUsuario } from '../../../src/api/deleteUsuario';
import { loginPlataforma } from '../../plataforma/loginPlataforma';


test.describe('Cadastro de convidado', () => {
  let token;

  test.beforeAll(async () => {
    await deleteLogin();
  });

  test.beforeEach(async ({ page, context }) => {
    await loginAdmin(page, context);
    token = await page.evaluate(() => localStorage.getItem('token')) ?? '';
    await deleteUsuario('devops+e2econvidado@instacasa.com.br', token);
  });

  test.afterEach(async ({ page }) => {
    await deleteUsuario('devops+e2econvidado@instacasa.com.br', token);
  });

  test.afterAll(async () => {
    await deleteLogin();
  });

  test('Pré cadastro e cadastro de convidado', async ({ page, context }) => {
    const userE2EConvidado = {
      email: 'devops+e2econvidado@instacasa.com.br',
      password: '@Convidado123!'
    };
    // Pré Cadastro
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
    await page.getByRole('textbox', { name: 'E-mail' }).fill(userE2EConvidado.email);
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
    await expect(url).toBeDefined;


    // Cadastro
    await page.goto(url);
    await page.getByTestId('textInput').click();
    await page.getByTestId('textInput').fill(codigo);
    await page.getByRole('button', { name: 'Começar' }).click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('textbox', { name: 'Senha *', exact: true }).click();
    await page.getByRole('textbox', { name: 'Senha *', exact: true }).fill(userE2EConvidado.password);
    await page.getByRole('textbox', { name: 'Confirmar senha *', exact: true }).click();
    await page.getByRole('textbox', { name: 'Confirmar senha *', exact: true }).fill(userE2EConvidado.password);
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByText('Para prosseguir é necessário').isVisible();
    await page.getByText('Aceito os termos de uso e pol').click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByText('Regular', { exact: true }).click();
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.locator('input[name="largura"]').click();
    await page.locator('input[name="largura"]').fill('10');
    await page.locator('input[name="profundidade"]').click();
    await page.locator('input[name="profundidade"]').fill('25');
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByRole('textbox', { name: 'Bairro *' }).click();
    await page.getByRole('textbox', { name: 'Bairro *' }).fill('Bairro');
    await page.getByLabel('Estado *').selectOption('MS');
    await page.getByRole('textbox', { name: 'Cidade *' }).click();
    await page.getByRole('textbox', { name: 'Cidade *' }).fill('Cidade');
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.locator('div').filter({ hasText: /^PlanoTerreno nivelado em relação a rua, sem inclinação$/ }).first().click();
    await page.getByRole('button', { name: 'Finalizar' }).click();
    await page.getByRole('button', { name: 'Acessar Plataforma' }).click();

    // Login
    await loginPlataforma(page,context, userE2EConvidado)
    
    // Pedido
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: '00680 Sobrado favoritar' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Solicitar projeto arquitetô' }).click();
    await page1.getByRole('button', { name: 'Prosseguir' }).click();
    await page1.getByText('Para prosseguir é necessário').isVisible();
    await page1.getByText('Estou ciente e aceito os').click();
    const page2Promise = page1.waitForEvent('popup');
    await page1.getByRole('button', { name: 'Prosseguir' }).click();
    const page2 = await page2Promise;
    await page2.getByText('Chat on WhatsApp with +55 ').isVisible();
  });
});