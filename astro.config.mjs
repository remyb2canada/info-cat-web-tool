import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: "en",
        locales: ["fr", "en"],
        routing: {
            prefixDefaultLocale: true,
            redirectToDefaultLocale: true
        }        
      }
});
