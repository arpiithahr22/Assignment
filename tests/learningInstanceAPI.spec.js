import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { LearningInstanceAPI } from '../utils/learninginstance.api';
import user from '../test-data/user.json';

test('Use Case 3: Learning Instance API Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const api = new LearningInstanceAPI(page);

  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await page.waitForURL('**/index', { timeout: 60000 });

  
  await dashboardPage.goToDocumentAutomation();


  const authHeaders = await api.captureAuthHeaders();
  expect(authHeaders['x-authorization']).toBeTruthy();

  const response = await api.createLearningInstance(authHeaders);

  expect(response.status()).toBe(200);
  expect(response.responseTime).toBeLessThan(5000);

  const body = await response.json();

  expect(body).toHaveProperty('id');
  expect(body.name).toBe('Doc1');
  expect(body.locale).toBe('en-US');

  console.log('Learning Instance ID:', body.id);
  console.log('Response Time (ms):', response.responseTime);
});
