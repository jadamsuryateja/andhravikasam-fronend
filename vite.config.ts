import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    // Add this to make environment variables available
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
  }
});
