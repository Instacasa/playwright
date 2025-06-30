import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import { envConfig } from '../../playwright.config';

test.describe('Financiamento', () => {
  
  const variables = envConfig.variables;

  test('test autocomple cidades', async ({ page }) => {
    await page.goto(`${variables.plataformaUrl}financiamento/simulacao`);
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('textbox', { name: 'Nome completo *' }).click();
    await page.getByRole('textbox', { name: 'Nome completo *' }).fill('Teste de testes');
    await page.locator('label').filter({ hasText: 'Masculino' }).locator('div').first().click();
    await page.getByRole('textbox', { name: 'CPF *' }).click();
    await page.getByRole('textbox', { name: 'CPF *' }).fill('448.102.650-21');
    await page.getByLabel('Estado civil *SolteiroCasado').selectOption('Solteiro');
    await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).click();
    await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).fill('23/03/1989');
    await page.getByRole('textbox', { name: 'dd/mm/yyyy' }).press('Tab');
    await page.getByRole('textbox', { name: 'Whatsapp *' }).fill('(48)99981-1577');
    await page.getByRole('textbox', { name: 'Whatsapp *' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email para contato *' }).fill('orlando_vw@hotmail.com');
    await page.getByRole('button', { name: 'Próximo' }).click();
    await page.getByLabel('EstadoACALAMAPBACEDFESGOMAMGMSMTPAPBPEPIPRRJRNRORRRSSCSESPTO').selectOption('SC');
    await page.getByLabel('CidadeAbdon BatistaAbelardo').selectOption('Salete');
    await page.getByLabel('CidadeAbdon BatistaAbelardo').selectOption('Caçador');
    await page.getByLabel('EstadoACALAMAPBACEDFESGOMAMGMSMTPAPBPEPIPRRJRNRORRRSSCSESPTO').selectOption('DF');
    await page.getByLabel('CidadeBrasília').selectOption('Brasília');
    await page.getByLabel('EstadoACALAMAPBACEDFESGOMAMGMSMTPAPBPEPIPRRJRNRORRRSSCSESPTO').selectOption('SP');
    await page.getByLabel('CidadeAdamantinaAdolfoAguaíÁ').selectOption('São Paulo');
    await expect(page.getByLabel('CidadeAdamantinaAdolfoAguaíÁ')).toContainText('São Paulo');
  });

});