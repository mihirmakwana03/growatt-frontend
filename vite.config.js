import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-redux'],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'], // Ensure all extensions are resolved
    alias: {
      '@components': path.resolve(__dirname, 'src/components'), // Optional alias for clarity
    },
  },
});