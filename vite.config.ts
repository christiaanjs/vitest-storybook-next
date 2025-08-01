/// <reference types="vitest/config" />

// Configure Vitest (https://vitest.dev/config/)

// import path from 'node:path'
import { defineConfig } from 'vite'
// import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin'
import nextjs from 'vite-plugin-storybook-nextjs'

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '#src': path.resolve(__dirname, 'src'),
  //   },
  // },
  plugins: [nextjs()],
  define: {
    global: 'globalThis',
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
    setupFiles: ['.storybook/vitest-setup.ts'],
    // projects: [
    //   {
    //     test: {
    //       name: 'browser',
    //       browser: {
    //         enabled: true,
    //         headless: true,
    //         provider: 'playwright',
    //         instances: [{ browser: 'chromium' }],
    //       },
    //     },
    //   },
    // ],
  },
  optimizeDeps: {
    include: [
      '@storybook/test',
      '@testing-library/react',
      '@testing-library/jest-dom',
      'next/head',
      'next/router',
      'next/client',
      'next/client/components',
    ],
    exclude: [
      'sb-original/image-context',
      '@storybook/nextjs',
      '@storybook/nextjs-vite',
      '@storybook/addon-*',
    ],
  },
})
