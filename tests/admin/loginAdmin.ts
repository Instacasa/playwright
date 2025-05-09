import fs from 'fs';
import { BrowserContext, Page } from '@playwright/test';
import { envConfig } from '../../playwright.config';



export const loginAdmin = async (page: Page, context: BrowserContext) => {
  const variables = envConfig.variables;
  const sessionCookiesPath = `playwright/.auth/${variables.admin.email}.json`;
  if (fs.existsSync(sessionCookiesPath)) {
    // Restaura sessão
    const session = JSON.parse(fs.readFileSync(sessionCookiesPath, 'utf-8'));
    await context.addCookies(session.cookies);
    await page.evaluate(() => localStorage.setItem('token', session.token));

    await page.goto(variables.adminUrl);
  } else {
    await page.goto(variables.adminUrl);
    await page.getByRole('textbox', { name: 'E-mail *' }).click();
    await page.getByRole('textbox', { name: 'E-mail *' }).fill(variables.admin.email);
    await page.getByRole('textbox', { name: 'Senha *' }).click();
    await page.getByRole('textbox', { name: 'Senha *' }).fill(variables.admin.password);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();

    await page.waitForTimeout(3000); 
    const token = await page.evaluate(() => localStorage.getItem('token')) ?? '';
    const cookies = await context.cookies();
    fs.writeFileSync(sessionCookiesPath, JSON.stringify({sessionCookies: cookies, token}), 'utf-8');
  }
}

export const deleteLogin = async () => {
  const variables = envConfig.variables;
  const sessionCookiesPath = `playwright/.auth/${variables.admin.email}.json`;
  if (fs.existsSync(sessionCookiesPath)) {
    fs.unlinkSync(sessionCookiesPath)
  }
}