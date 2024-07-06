import { defineConfig } from "astro/config";
import htmx from "astro-htmx";
import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: ['prismjs']
    }
  },
  integrations: [htmx(), mdx(), alpinejs()],
  markdown: {
    syntaxHighlight: 'prism',
  }
});
