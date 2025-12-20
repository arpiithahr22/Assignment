import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { FormPage } from '../pages/form.page';
import { TaskFormBotPage } from '../pages/taskformbot.page';
import user from '../test-data/user.json';

test('Use Case 2: Create Form and Display via Task Bot', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const formPage = new FormPage(page);
  const taskFormBotPage = new TaskFormBotPage(page);

  // Generate unique names using the current timestamp
  const timestamp = Date.now();
  const formName = `Form_${timestamp}`;
  const botName = `FormBot_${timestamp}`;

  await page.goto(
    'https://community.cloud.automationanywhere.digital/#/login?next=/index',
    { waitUntil: 'networkidle' }
  );

  // Login process
  await loginPage.login(user.username, user.password);
  await page.waitForURL('**/index', { timeout: 60000 });

  // 1. Create the Form
  await dashboardPage.goToAutomation();
  await dashboardPage.clickCreateForm();
  await dashboardPage.createForm(formName); // Use dynamic name

  // 2. Build the Form
  await formPage.waitForFormEditor();
  await formPage.dragAndDropElements();
  await formPage.saveFormAndExitViaSidebar(); 

  // 3. Create the Task Bot
  await dashboardPage.goToAutomation();
  await dashboardPage.clickCreateTaskBot();
  await dashboardPage.createTaskBot(botName); // Use dynamic name

  await taskFormBotPage.addStepPanel('Panel 1: Form Display');
  await taskFormBotPage.addInteractiveFormDisplay();
  await taskFormBotPage.createFormVariable(formName); 

  // 5. Run the Bot
  // No need for waitForRuntimeMessage if you don't have a connected device
  await taskFormBotPage.runTaskBot();

  console.log(`✅ Success: FormBot ${botName} created and saved.`);
});