import { defineConfig } from 'vite'
import { UserConfigExport } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
} as UserConfigExport);
