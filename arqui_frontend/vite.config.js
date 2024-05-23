import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    proxy: {
      '/heartbeat': {
        target: 'https://workers.nukor.xyz',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/heartbeat/, '/heartbeat')
      }
    }
  }
});
