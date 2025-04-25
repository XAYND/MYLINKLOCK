import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react()],
  base: '/MYLINKLOCK/', // remplace par TON nom de repo exact
})