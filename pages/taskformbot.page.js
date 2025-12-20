import { expect } from '@playwright/test';

export class TaskFormBotPage {
  constructor(page) {
    this.page = page;

    this.searchActions = page.getByPlaceholder('Search actions');

    // Action Locators
    this.displayAction = page.getByRole('button', { name: 'Display', exact: true });
    this.stepAction = page.getByRole('button', { name: 'Step', exact: true });
    this.messageBoxAction = page.getByRole('button', { name: 'Message box', exact: true });

    // Properties Panel Locators
    this.stepTitleInput = page.locator('div[class*="properties"] input, .cl-input-container input').first();
    this.savePropertiesBtn = page.getByRole('button', { name: 'Save', exact: true });
    this.messageInput = page.getByRole('textbox').nth(2); // Match locator from taskbot.page.js

    // Variable Creation Locators
    this.createVariableBtn = page.locator('button[aria-label^="Create variable"]');
    this.variableNameInput = page.getByRole('textbox', { name: 'Name' });
    this.chooseDefaultBtn = page.locator('button[name="defaultFile.repositoryPath.choose"]');
    this.findFormSearch = page.getByRole('textbox', { name: 'Type to search' });
    this.chooseFormBtn = page.getByRole('button', { name: 'Choose' });
    this.createAndSelectBtn = page.getByRole('button', { name: 'Create & select' });

    this.runButton = page.locator('button').filter({ hasText: 'Run' });
  }

  /**
   * Creates a 'Step' container (Panel) in the flow
   */
  async addStepPanel(title) {
    await this.searchActions.fill('step');
    await expect(this.stepAction).toBeVisible();
    await this.stepAction.dblclick();
    
    await expect(this.stepTitleInput).toBeVisible();
    await this.stepTitleInput.fill(title);
    await this.savePropertiesBtn.click();
  }

  async addInteractiveFormDisplay() {
    await expect(this.searchActions).toBeVisible({ timeout: 60000 });
    await this.searchActions.fill('interactive');
    await expect(this.displayAction).toBeVisible({ timeout: 60000 });
    await this.displayAction.dblclick();
  }

  async addMessageBoxAction(message) {
    await this.searchActions.fill('message box');
    await expect(this.messageBoxAction).toBeVisible();
    await this.messageBoxAction.dblclick();

    await expect(this.messageInput).toBeVisible();
    await this.messageInput.fill(message);
    await this.savePropertiesBtn.click();
  }

  async createFormVariable(formName) {
    // 1. Click the action to open the properties panel
    await this.page.getByText('Interactive forms: Display').first().click();
    
    // 2. WAIT for the specific container of the "Form name" input to be visible
    await this.page.locator('div').filter({ hasText: /^Form name$/ }).waitFor({ state: 'visible' });

    // 3. Click the Create Variable (+) button
    // Using the icon character found in the snapshot ()
    const createBtn = this.page.locator('button').filter({ hasText: '' });
    await createBtn.click();

    // 4. Fill 'Create variable' dialog
    await this.page.getByRole('textbox', { name: 'Name' }).fill('F1');
    
    // 5. Open 'Find a Form' and select
    await this.page.getByRole('button', { name: 'Choose…' }).click();
    
    const searchInput = this.page.getByPlaceholder('Type to search');
    await searchInput.fill(formName);

    await this.page
  .locator('[data-automation-id="action-node"]')
  .filter({ hasText: 'Display' })
  .click({ force: true });

    
    // Click the result in the list
    await this.page.getByRole('listitem').filter({ hasText: formName }).click();
    await this.page.getByRole('button', { name: 'Choose', exact: true }).click();

    // 6. Finalize
    await this.page.getByRole('button', { name: 'Create & select' }).click();
}

  async runTaskBot() {
    await expect(this.runButton).toBeVisible({ timeout: 30000 });
    await this.runButton.click();
  }

  async waitForRuntimeMessage(message) {
    const runtimeDialog = this.page.getByRole('dialog');
    await expect(runtimeDialog).toBeVisible({ timeout: 60000 });
    await expect(runtimeDialog).toContainText(message);

    const okButton = runtimeDialog.getByRole('button', { name: /ok/i });
    if (await okButton.isVisible()) {
      await okButton.click();
    }
  }
}