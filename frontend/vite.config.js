import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Fix import statement
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
});
