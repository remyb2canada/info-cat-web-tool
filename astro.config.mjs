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

    // VueJS integration
    // Identifies the GCDS components as custom elements and have VueJS skip resolution (to avoid the "failed to resolve component")
  integrations: [vue({
    template: {
      compilerOptions: {
        // treat any tag that starts with gcds- as custom elements
        isCustomElement: (tag) => tag.startsWith('gcds-'),
      }
    }
  })],

  // make sure dependencies are included in the static site build process
  // this means adding the GCDS node_modules (from the package.json)
  // COMMENTED OUT BECAUSE IT DOESN'T SEEM TO WORK
  // instead, the production build process needs to copy package.json into the 'dist/' folder and a `npm install` needs to be run
  //vite: {
  //  ssr: {
  //    noExternal: true
  //  }
  //}
});