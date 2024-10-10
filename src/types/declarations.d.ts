declare module '*.ttf';
declare module '*.jpg';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}

declare const VITE_FIREBASE_APIKEY: string;
declare const VITE_FIREBASE_DOMAIN: string;
declare const VITE_FIREBASE_PROJECTID: string;
declare const VITE_FIREBASE_STORAGEBUCKET: string;
declare const VITE_FIREBASE_MESSAGINGID: string;
declare const VITE_FIREBASE_APPID: string;
