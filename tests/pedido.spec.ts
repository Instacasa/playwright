import { test, expect } from '@playwright/test';
import { envConfig } from '../playwright.config';
import { deleteUsuario } from '../src/api/deleteUsuario';
import { deleteLogin, loginAdmin } from './admin/loginAdmin';

test.describe('Cadastrar proprietário e pedido de projeto', () => {
  let token;
  const variables = envConfig.variables;
  const userE2EProprietario = {
    email: 'g_testes+e2eproprietario@instacasa.com.br',
    password: '@Proprietario123!'
  };

  test.beforeEach(async ({ page, context }) => {
    await deleteUsuario(userE2EProprietario.email, token);
  });

  test.afterEach(async ({ page }) => {
    await deleteUsuario(userE2EProprietario.email, token);
  });

test('test', async ({ page }) => {

  await page.goto(variables.plataformaUrl);
  await page.getByRole('link', { name: 'Criar Conta' }).click();
  await expect(page.locator('body')).toContainText('Proprietário com código InstaCasa');
  await page.getByText('Cadastro para proprietários').click();
  await page.locator('input[name="codigos-0"]').click();
  await page.locator('input[name="codigos-0"]').fill('Y5FBW');
  await page.locator('div').filter({ hasText: /^Adicionar novo código InstaCasa$/ }).locator('path').click();
  await page.locator('input[name="codigos-1"]').click();
  await page.locator('input[name="codigos-1"]').fill('XD9CJ');
  await page.locator('input[name="nome"]').click();
  await page.locator('input[name="nome"]').fill('Claudio');
  await page.locator('input[name="nome"]').press('Tab');
  await page.locator('input[name="sobrenome"]').fill('Testador');
  await page.locator('input[name="cpf"]').click();
  await page.locator('input[name="cpf"]').fill('794.906.910-46');
  await page.locator('input[name="telefone"]').click();
  await page.locator('input[name="telefone"]').fill('(84)99168-2967');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill(userE2EProprietario.email);
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('input[name="cep"]').click();
  await page.locator('input[name="cep"]').fill('59056400');
  await page.locator('input[name="cep"]').press('Tab');
  await expect(page.locator('input[name="logradouro"]')).toHaveValue('Rua da Saudade');
  await page.locator('div').filter({ hasText: /^Rua\/AvenidaNúmeroSem número$/ }).locator('input[name="numero"]').click();
  await page.locator('div').filter({ hasText: /^Rua\/AvenidaNúmeroSem número$/ }).locator('input[name="numero"]').fill('1184');
  await page.locator('input[name="complemento"]').click();
  await page.locator('input[name="complemento"]').fill('ap 202');
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(userE2EProprietario.password);
  await page.locator('div').filter({ hasText: /^Senha \*$/ }).getByRole('img').click();
  await expect(page.locator('input[name="password"]')).toHaveValue(userE2EProprietario.password);
  await page.locator('input[name="confirmarSenha"]').click();
  await page.locator('input[name="confirmarSenha"]').fill(userE2EProprietario.password);
  await page.locator('label').filter({ hasText: 'Aceito os termos de uso e pol' }).locator('div').nth(1).click();
  await page.getByRole('button', { name: 'Finalizar' }).click();
  await page.getByRole('textbox', { name: 'E-mail *' }).click();
  await page.getByRole('textbox', { name: 'E-mail *' }).fill(userE2EProprietario.email);
  await page.getByRole('textbox', { name: 'E-mail *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Senha *' }).fill(userE2EProprietario.password);
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.getByRole('button', { name: 'Aceitar' }).click();
  await expect(page.getByRole('heading')).toContainText('Bem vindo à InstaCasa');
  await page.locator('div').filter({ hasText: /^Revender$/ }).first().click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.locator('div').filter({ hasText: /^Influenciou pouco$/ }).first().click();
  await page.getByRole('button', { name: 'Finalizar e acessar a' }).click();
  await page.getByRole('link', { name: 'Plataforma' }).nth(1).click();
  await page.getByRole('link', { name: '03714 Casa Térrea favoritar' }).click();
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Ícone do botão Adicionar aos' }).click();
  await page1.getByRole('link', { name: 'Solicitar sem personalização' }).click();
  await page1.getByText('Cozinha aberta').click();
  await page1.getByRole('link', { name: 'Prosseguir' }).click();
  await page1.getByText('Quero escolher o lado da').click();
  await page1.getByText('Lado esquerdo').click();
  await page1.getByRole('link', { name: 'Prosseguir' }).click();
  await expect(page1.locator('#mainContent')).toContainText('Lado esquerdo (escolhido pelo cliente)');
  await page1.getByText('Opcionais: Cozinha aberta').click();
  await expect(page1.locator('#mainContent')).toContainText('Cozinha aberta');
  await page1.getByRole('button', { name: 'Confirmar pedido' }).click();
  await expect(page1.locator('#mainContent')).toContainText('Confirmar pedido de projeto');
  await page1.getByRole('button', { name: 'Confirmar e finalizar' }).click();
  await expect(page1.getByRole('heading')).toContainText('Meu Projeto');
  await page1.getByRole('link', { name: 'Ver detalhes' }).click();
});

});