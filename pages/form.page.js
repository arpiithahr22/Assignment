import { expect } from '@playwright/test';

export class FormPage {
  constructor(page) {
    this.page = page;

    this.frame = page.frameLocator('iframe');

    this.canvas = this.frame.locator('.formcanvas__leftpane');
    this.saveButton = this.frame.getByRole('button', { name: /^Save$/i });

    this.automationSidebar = page.getByRole('link', {
      name: 'Automation',
      exact: true
    });
  }

  async waitForFormEditor() {
    await expect(this.canvas).toBeVisible({ timeout: 60000 });
  }

  async dragAndDropElements() {
  
    await this.frame.getByRole('button', { name: ' Text Box' }).hover();
    await this.page.mouse.down();
    await this.canvas.hover();
    await this.page.mouse.up();

    await this.frame.getByRole('button', { name: ' Select File' }).hover();
    await this.page.mouse.down();
    await this.canvas.hover();
    await this.page.mouse.up();

  
    await this.canvas.click({ force: true });
  }

  async saveFormAndExitViaSidebar() {
  
    await expect(this.saveButton).toBeVisible({ timeout: 60000 });
    await expect(this.saveButton).toBeEnabled({ timeout: 60000 });
    await this.saveButton.click({ force: true });

    await this.page.waitForTimeout(3000);

    
    await expect(this.automationSidebar).toBeVisible({ timeout: 30000 });
    await this.automationSidebar.click();

    
    await this.page.waitForURL(/bots\/repository/, {
      timeout: 60000
    });
  }
}

