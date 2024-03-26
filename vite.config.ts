/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: '$1',
      },
    ],
  },
  plugins: [
    react(),
    svgr(),
    checker({
      overlay: false,
      typescript: true,
      eslint: {
        lintCommand: 'eslint ./src/**/*.{ts,tsx}',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{scss,css}',
      },
    }),
  ],
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`,
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  // https://vitest.dev/config/
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: 'setup/test-setup.ts',
    globals: true,
    // threads: false,
    // watch: false,
  },
});
