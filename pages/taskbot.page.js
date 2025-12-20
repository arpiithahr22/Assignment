import { expect } from '@playwright/test';

export class TaskBotPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.createAndEditBtn = page.getByRole('button', { name: 'Create & edit' });

    this.searchActions = page.getByPlaceholder('Search actions');
    this.messageBoxAction = page.getByRole('button', {
      name: 'Message box',
      exact: true
    });

    this.messageInput = page.getByRole('textbox').nth(2);

   
    this.runButton = page.locator('button').filter({ hasText: 'Run' });
  }

  async createTaskBot(name) {
    await expect(this.nameInput).toBeVisible({ timeout: 30000 });
    await this.nameInput.fill(name);
    await this.createAndEditBtn.click();
  }

  async addMessageBoxAction() {
    await expect(this.searchActions).toBeVisible({ timeout: 30000 });
    await this.searchActions.fill('message box');

    await expect(this.messageBoxAction).toBeVisible({ timeout: 30000 });
    await this.messageBoxAction.dblclick();
  }

  async configureMessageBox(message) {
    await expect(this.messageInput).toBeVisible({ timeout: 30000 });

    await this.messageInput.click();
    await this.messageInput.fill(message);

    await expect(this.messageInput).toContainText(message);
  }

 async runTaskBot() {
    // This finds the Run button specifically and clicks it even if covered
    const runButton = this.page.locator('button').filter({ hasText: 'Run' });
    await expect(runButton).toBeVisible({ timeout: 30000 });
    await runButton.click({ force: true });
  }


async verifyActionAdded(actionName) {
  const actionInFlow = this.page.locator('.flow-canvas').getByText(actionName);
  await expect(actionInFlow).toBeVisible({ timeout: 15000 });
}

}
