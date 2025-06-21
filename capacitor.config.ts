import type { CapacitorConfig } from '@capacitor/cli';

const config = {
  appId: 'com.tarea.app',
  appName: 'tarea-app',
  webDir: 'build',
  bundledWebRuntime: false, // esto funciona aunque no esté tipado
};

export default config;
