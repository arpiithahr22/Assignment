# **Automation Anywhere UI and API Automation using Playwright**

## **Overview**

This project provides a robust automation suite for the **Automation Anywhere Community Cloud** platform. Utilizing **Playwright** and the **Page Object Model**, this framework automates the end-to-end lifecycle of bot creation, form integration, and variable management.

The architecture is specifically engineered to handle **complex and dynamic enterprise user interfaces**, ensuring high stability and long-term maintainability.

---

## **Technical Stack**

* **Playwright JavaScript:** Core automation engine for cross-browser testing.
* **Node.js:** Backend runtime environment.
* **Automation Anywhere Community Cloud:** Target enterprise platform.
* **Page Object Model:** Design pattern used to enhance test reusability and clarity.

---
**Use Case 1**
[ccbf8d440cf71140da39358e19ffe69f0a8bb221.webm](https://github.com/user-attachments/assets/7c50fb0a-dbe2-4bf6-ba8c-bb9b3800a3b2)

**Use Case 2**

[4b35a9425abacdaca9af5890839ab12b4f35ffe7.webm](https://github.com/user-attachments/assets/b45b0ca7-1fa2-4b48-ba33-c9cc0fab42f6)

## **Project Structure**

```text
automation-anywhere-project/
│
├── pages/
│   ├── login.page.js
│   ├── dashboard.page.js
│   ├── form.page.js
│   └── taskformbot.page.js  -- Handles Interactive Forms and Variable logic
│
├── tests/
│   ├── form.spec.js         -- End-to-End User Interface Flow
│   └── learningInstanceAPI.spec.js
└── └── taskbot.spec.js
│
└──test-data
└── └── user.json
│
└── package.json
└── playwright.config.js

```
---
## **Test Execution**

### Install Dependencies
```bash
npm install

Run All Tests (Single Worker – Recommended)
npx playwright test --workers=1

Run in Headed Mode with HTML Report
npx playwright test --headed --reporter=html

View Test Report
npx playwright show-report


---
```

---

## **Key Automation Challenges Solved**

Icon-only buttons:
Some buttons (like Create variable) had only icons and no text, which caused locator failures. This was fixed by using more reliable role-based selectors instead of icon text.

Popup and modal handling:
The Find a Form popup loads results dynamically. The test initially failed because it tried to click before the form appeared. This was resolved by waiting until the required form was visible before selecting it.

Form configuration errors:
The Interactive forms: Display action showed validation errors when default values were missing. These were handled by automatically setting required values, clearing the error indicators.

---
```
## **Author**

**Arpitha H R**
**B.E Computer Science Engineering**
