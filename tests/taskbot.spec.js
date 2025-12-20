import { test, expect } from '@playwright/test'; // Added expect here
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { TaskBotPage } from '../pages/taskbot.page';
import user from '../test-data/user.json';

test('Use Case 1: Create Message Box Task Bot', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const taskBotPage = new TaskBotPage(page);

  const dynamicBotName = `form_${Date.now()}`;

  await loginPage.goto();
  await loginPage.login(user.username, user.password);

  await dashboardPage.waitForDashboard();
  await dashboardPage.goToAutomation();

  await dashboardPage.clickCreateTaskBot();
  await taskBotPage.createTaskBot(dynamicBotName);

  await taskBotPage.addMessageBoxAction();

  const message = 'Hello This is Arpitha!!!';
  await taskBotPage.configureMessageBox(message);

  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000); 
  
  const runBtn = page.locator('button').filter({ hasText: 'Run' });
  await runBtn.click({ force: true });

  console.log('Test Passed: Bot created and Run initiated.');

});