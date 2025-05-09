import fs from 'fs';
import { BrowserContext, expect, Page } from '@playwright/test';
import { envConfig } from '../../playwright.config';


export const loginPlataforma = async (page: Page, context: BrowserContext, user: {email: string, password: string}, url?: string) => {
  const variables = envConfig.variables;
  const sessionCookiesPath = `playwright/.auth/${variables.admin.email}.json`;
  if (fs.existsSync(sessionCookiesPath) && url) {
    // Restaura sessão
    const sessionCookies = JSON.parse(fs.readFileSync(sessionCookiesPath, 'utf-8'));
    await context.addCookies(sessionCookies);
    await page.goto(url);
  } else {
    if (url) {
      await page.goto(url);
    }
    await page.getByRole('textbox', { name: 'E-mail *' }).click();
    await page.getByRole('textbox', { name: 'E-mail *' }).fill(user.email);
    await page.getByRole('textbox', { name: 'Senha *' }).click();
    await page.getByRole('textbox', { name: 'Senha *' }).fill(user.password);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();

    // Autorização Auth0
    // await page.getByRole('button', { name: 'Aceitar' }).click();
    const aceiteAuth0 =page.getByRole('button', { name: 'Aceitar' });
    if (aceiteAuth0) {
      await aceiteAuth0.click();
    }

    await page.waitForTimeout(3000); 
    const sessionCookies = await context.cookies();
    fs.writeFileSync(sessionCookiesPath, JSON.stringify(sessionCookies), 'utf-8');
  }
}

export const deleteLogin = async (email) => {
  const sessionCookiesPath = `playwright/.auth/${email}.json`;
  if (fs.existsSync(sessionCookiesPath)) {
    fs.unlinkSync(sessionCookiesPath)
  }
}