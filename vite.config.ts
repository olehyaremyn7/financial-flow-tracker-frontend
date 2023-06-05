import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

enum Mode {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export default defineConfig(({ mode }) => {
  const isProduction = mode === Mode.PRODUCTION;

  return {
    plugins: [react()],
    base: './',
    server: {
      host: true,
      port: 3000,
      open: true,
      strictPort: true,
      cors: true,
    },
    preview: {
      host: true,
      port: 3000,
      open: false,
      strictPort: true,
      cors: true,
    },
    build: {
      sourcemap: !isProduction,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "./src/scss/utilities/variables.scss";
          @import "./src/scss/utilities/mixins.scss";
        `,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      css: true,
      exclude: [...configDefaults.exclude],
      include: [...configDefaults.include, 'src/**/__tests__/*'],
      setupFiles: 'src/tests/setup.ts',
      clearMocks: true,
      coverage: {
        provider: 'c8',
        enabled: true,
        reporter: ['text', 'html', 'clover', 'json'],
        reportsDirectory: './coverage',
        exclude: [...configDefaults.coverage.exclude, 'src/main.tsx', '**/src/tests/**', 'cypress/**/*.*', 'dist'],
        excludeNodeModules: true,
        clean: true,
        cleanOnRerun: true,
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  };
});
