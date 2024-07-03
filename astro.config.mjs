import { defineConfig } from "astro/config";
import htmx from "astro-htmx";
import mdx from "@astrojs/mdx";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [htmx(), mdx(), alpinejs()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      langs: ['astro', 'html'],
      wrap: true
    }
  }
});