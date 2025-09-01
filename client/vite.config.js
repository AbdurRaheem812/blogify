import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev proxy so client uses /api and forwards to server:5000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
