import fs from 'fs';
import { BrowserContext, Page } from '@playwright/test';
import { envConfig } from '../../playwright.config';



export const loginAdmin = async (page: Page, context: BrowserContext) => {
  const variables = envConfig.variables;
  const sessionCookiesPath = `playwright/.auth/${variables.adminUser}.json`;
  if (fs.existsSync(sessionCookiesPath)) {
    // Restaura sessão
    const sessionCookies = JSON.parse(fs.readFileSync(sessionCookiesPath, 'utf-8'));
    await context.addCookies(sessionCookies);
    await page.goto(variables.adminUrl);
  } else {
    await page.goto(variables.adminUrl);
    await page.getByRole('textbox', { name: 'E-mail *' }).click();
    await page.getByRole('textbox', { name: 'E-mail *' }).fill(variables.adminUser);
    await page.getByRole('textbox', { name: 'Senha *' }).click();
    await page.getByRole('textbox', { name: 'Senha *' }).fill(variables.adminPassword);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();

    await page.waitForTimeout(3000); 
    const sessionCookies = await context.cookies();
    fs.writeFileSync(sessionCookiesPath, JSON.stringify(sessionCookies), 'utf-8');
  }
}

export const deleteLogin = async () => {
  const variables = envConfig.variables;
  const sessionCookiesPath = `playwright/.auth/${variables.adminUser}.json`;
  if (fs.existsSync(sessionCookiesPath)) {
    fs.unlinkSync(sessionCookiesPath)
  }
}