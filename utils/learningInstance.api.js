import { expect } from '@playwright/test';

export class LearningInstanceAPI {
  constructor(page) {
    this.page = page;
    this.endpoint =
      'https://community.cloud.automationanywhere.digital/cognitive/v3/learninginstances';
  }

  async captureAuthHeaders() {
    const token = await this.page.evaluate(() => {
      for (const key in localStorage) {
        if (key.toLowerCase().includes('authorization')) {
          return localStorage.getItem(key);
        }
      }
      return null;
    });

    expect(token).toBeTruthy();

    return {
      'content-type': 'application/json',
      accept: 'application/json',
      'x-authorization': token
    };
  }


  async createLearningInstance(headers) {
    const payload = {
      name: 'Doc1',
      description: '',
      domainId: '33DED827-3DC4-4201-B478-7C15B94AF522',
      domainLanguageId: 'B62EFA19-3592-4D2B-910A-E9C1C7DAE1A9',
      domainLanguageProviderId: 'D6CCA488-207A-4FCA-94E0-74E2FCA38B40',
      locale: 'en-US',
      fields: [
        {
          name: 'invoice_number',
          displayName: 'Invoice Number',
          dataType: 'TEXT',
          featureType: 'KEY_VALUE',
          isRequired: true,
          isEnabled: true,
          isCustom: false,
          defaultAliases: ['invoice number', 'inv #'],
          rules: []
        }
      ],
      genaiFeature: { tableFieldSupported: true },
      genaiProvider: 'Open_AI',
      isCloudExtraction: false,
      isDefault: true,
      isGenAIEnabled: true,
      isHeuristicFeedbackEnabled: true,
      rules: [],
      tables: [{ name: 'table', description: '' }],
      useGenai: true
    };

    const start = Date.now();

    const response = await this.page.request.post(this.endpoint, {
      headers,
      data: payload
    });

    response.responseTime = Date.now() - start;
    return response;
  }
}
