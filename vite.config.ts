import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import circleDependency from 'vite-plugin-circular-dependency';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    circleDependency(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
        ref: true,
        titleProp: true,
        svgProps: { role: 'img' },
      },
      include: '**/*.svg',
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
