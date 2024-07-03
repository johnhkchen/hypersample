import { defineConfig } from "astro/config";
import htmx from "astro-htmx";

// https://astro.build/config
export default defineConfig({
  integrations: [htmx()],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      langs: ['astro', 'html'],
      wrap: true,
    }
  }
});
