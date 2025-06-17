/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@assets': `${root}/assets`,
      '@modules': `${root}/modules`,
      '@components': `${root}/components`,
      '@layouts': `${root}/layouts`,
      '@pages': `${root}/pages`,
      '@routes': `${root}/routes`,
      '@api': `${root}/lib/api`,
      '@constants': `${root}/lib/constants`,
      '@enums': `${root}/lib/enums`,
      '@configs': `${root}/lib/configs`,
      '@hooks': `${root}/lib/hooks`,
      '@store': `${root}/lib/store`,
      '@utils': `${root}/lib/utils`,
      '@abi': `${root}/abi`,
      '@codegen': `${root}/__generated__/`,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts',
        '**/*.stories.*',
        '**/*.test.*',
        '**/*.spec.*',
      ],
    },
  },
}) 