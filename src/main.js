// AUTO-LOAD API KEYS FROM .env
const autoKeys = {
  'CESIUM_ION_TOKEN': import.meta.env.VITE_CESIUM_ION_TOKEN,
  'TOMTOM_API_KEY': import.meta.env.VITE_TOMTOM_API_KEY,
  'AISSTREAM_API_KEY': import.meta.env.VITE_AISSTREAM_API_KEY,
  'FIRMS_MAP_KEY': import.meta.env.VITE_FIRMS_API_KEY,
  'GROQ_API_KEY': import.meta.env.VITE_GROQ_API_KEY,
  'GEMINI_API_KEY': import.meta.env.VITE_GEMINI_API_KEY,
  'OPENSKY_CLIENT_ID': import.meta.env.VITE_OPENSKY_CLIENT_ID,
  'OPENSKY_CLIENT_SECRET': import.meta.env.VITE_OPENSKY_CLIENT_SECRET,
};
for (const [k, v] of Object.entries(autoKeys)) {
  if (v && !localStorage.getItem(k)) {
    localStorage.setItem(k, v);
  }
}

import { createStandaloneApplication } from './standalone/application.js';
import { describeError } from './standalone/errors.js';

const application = createStandaloneApplication({
  googleApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
  cesiumToken: import.meta.env.CESIUM_ION_TOKEN,
  allowQaRegistration: import.meta.env.DEV,
});

application.start().catch((error) => {
  console.error("God's Eye View initialization failed:", error);
  const loaderStatus = document.querySelector('#loading-screen .loader-status');
  loaderStatus.textContent = `Error: ${describeError(error)}`;
  loaderStatus.style.color = '#ff4444';
});

export { application };
