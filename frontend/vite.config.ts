import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
    // Make sure you configure base routing here
    fs: {
      allow: ['..']  // This allows access to directories outside of the root folder
    },
  },
});
