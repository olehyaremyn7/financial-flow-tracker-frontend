import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'financial-flow-tracker-frontend',
  fixturesFolder: false,
  video: false,
  watchForFileChanges: true,
  chromeWebSecurity: false,
  retries: {
    runMode: 3,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
  },
});
