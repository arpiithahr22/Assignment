import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;

    // ===============================
    // COMMON / SIDEBAR
    // ===============================
    this.mainSidebar = page.locator('nav').filter({ hasText: 'Automation' });

    this.automationMenu = this.mainSidebar.getByRole('link', {
      name: 'Automation',
      exact: true
    });

    // ✅ FIXED: Scoped Create button (NO ambiguity)
    this.createButton = page
      .getByRole('heading', { name: 'Automation Create Manage' })
      .getByLabel('Create');

    // ===============================
    // USE CASE 1 – TASK BOT
    // ===============================
    this.taskBotOption = page.getByRole('button', { name: 'Task Bot' });

    // ===============================
    // USE CASE 2 – FORM
    // ===============================
    this.formOption = page.getByRole('button', { name: 'Form' });

    this.formNameInput = page.getByRole('textbox', { name: 'Name' });

    this.createFormButton = page.getByRole('button', {
      name: 'Create'
    });

    // ===============================
    // USE CASE 3 – AI / LEARNING INSTANCE
    // ===============================
    this.aiMenu = page.getByRole('button', { name: 'AI', exact: true });

    this.documentAutomation = page.getByRole('link', {
      name: 'Document Automation'
    });

    this.createLearningInstanceBtn = page.locator(
      'button:has(span[data-text="Create Learning Instance"])'
    );
  }

  // ===============================
  // COMMON METHODS
  // ===============================
  async waitForDashboard() {
    await expect(this.mainSidebar).toBeVisible({ timeout: 60000 });
    await expect(this.automationMenu).toBeVisible({ timeout: 60000 });
  }

  async goToAutomation() {
    await this.automationMenu.click();
  }

  // ===============================
  // USE CASE 1 – TASK BOT
  // ===============================
  async clickCreateTaskBot() {
    await expect(this.createButton).toBeVisible({ timeout: 30000 });
    await this.createButton.click();

    await expect(this.taskBotOption).toBeVisible({ timeout: 30000 });
    await this.taskBotOption.click();
  }

  async createTaskBot(name) {
    const nameInput = this.page.getByRole('textbox', { name: 'Name' });
    const createEditBtn = this.page.getByRole('button', {
      name: 'Create & edit'
    });

    await expect(nameInput).toBeVisible({ timeout: 30000 });
    await nameInput.fill(name);

    await expect(createEditBtn).toBeVisible({ timeout: 30000 });
    await createEditBtn.click();
  }

  // ===============================
  // USE CASE 2 – FORM
  // ===============================
  async clickCreateForm() {
    await expect(this.createButton).toBeVisible({ timeout: 30000 });
    await this.createButton.click();

    await expect(this.formOption).toBeVisible({ timeout: 30000 });
    await this.formOption.click();
  }

  async createForm(name = 'Form Bot') {
    await expect(this.formNameInput).toBeVisible({ timeout: 30000 });
    await this.formNameInput.fill(name);

    await expect(this.createFormButton).toBeVisible({ timeout: 30000 });
    await this.createFormButton.click();
  }

  // ===============================
  // USE CASE 3 – AI / LEARNING INSTANCE
  // ===============================
  async goToDocumentAutomation() {
    await expect(this.aiMenu).toBeVisible({ timeout: 60000 });
    await this.aiMenu.click();

    await expect(this.documentAutomation).toBeVisible({ timeout: 60000 });
    await this.documentAutomation.click();

    await this.page.waitForTimeout(5000);
  }

  async clickCreateLearningInstance() {
    await expect(this.createLearningInstanceBtn).toBeVisible({
      timeout: 60000
    });

    await this.createLearningInstanceBtn.click();
  }
}
