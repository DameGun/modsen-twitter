/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_FIREBASE_APIKEY: string;
  VITE_FIREBASE_DOMAIN: string;
  VITE_FIREBASE_PROJECTID: string;
  VITE_FIREBASE_STORAGEBUCKET: string;
  VITE_FIREBASE_MESSAGINGID: string;
  VITE_FIREBASE_APPID: string;
}
