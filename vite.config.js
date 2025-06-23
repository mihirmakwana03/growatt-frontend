import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, // Use environment variable for deployment
        changeOrigin: true,
        secure: process.env.NODE_ENV === 'production', // Enable SSL verification in production
      },
    },
  },
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