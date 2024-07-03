import { defineConfig } from "astro/config";
import htmx from "astro-htmx";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [htmx(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      langs: ['astro', 'html'],
      wrap: true
    }
  }
});