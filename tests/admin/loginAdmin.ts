import { Page } from '@playwright/test';

export const loginAdmin = async (page: Page, adminURL: string) => {
  await page.goto(adminURL);
  await page.getByRole('textbox', { name: 'E-mail *' }).click();
  await page.getByRole('textbox', { name: 'E-mail *' }).fill('devops@instacasa.com.br');
  await page.getByRole('textbox', { name: 'Senha *' }).click();
  await page.getByRole('textbox', { name: 'Senha *' }).fill('fbsYH76x28$K');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
}