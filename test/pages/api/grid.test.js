import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, it } from "vitest";
import { JSDOM } from "jsdom";

import Grid from "@pages/api/grid.astro";

const theDOM = it.extend({
  dom: async ({}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(Grid));
    await use(dom);
  },
});

theDOM("sends a button that says 'Coming Soon'", async ({ dom }) => {
  const e = dom.window.document.querySelector("button");
  expect(e.textContent).toBe("Coming Soon");
});
