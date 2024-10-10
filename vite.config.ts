import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import circleDependency from 'vite-plugin-circular-dependency';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
    define: {
      VITE_FIREBASE_APIKEY: JSON.stringify(env.VITE_FIREBASE_APIKEY),
      VITE_FIREBASE_DOMAIN: JSON.stringify(env.VITE_FIREBASE_DOMAIN),
      VITE_FIREBASE_PROJECTID: JSON.stringify(env.VITE_FIREBASE_PROJECTID),
      VITE_FIREBASE_STORAGEBUCKET: JSON.stringify(env.VITE_FIREBASE_STORAGEBUCKET),
      VITE_FIREBASE_MESSAGINGID: JSON.stringify(env.VITE_FIREBASE_MESSAGINGID),
      VITE_FIREBASE_APPID: JSON.stringify(env.VITE_FIREBASE_APPID),
    },
  };
});
