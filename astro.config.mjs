import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  i18n: {
      defaultLocale: "en",
      locales: ["fr", "en"],
      routing: {
          prefixDefaultLocale: true,
          redirectToDefaultLocale: true
      }        
    },

  integrations: [vue()]
});