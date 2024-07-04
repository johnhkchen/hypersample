import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, it } from "vitest";
import { JSDOM } from "jsdom";

import Flex from "@pages/api/flex.astro";

const theDOM = it.extend({
  dom: async ({}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(Flex));
    await use(dom);
  },
});

theDOM("sends a button that says 'Coming Soon'", async ({ dom }) => {
  const e = dom.window.document.querySelector("button");
  expect(e.textContent).toBe("Coming Soon");
});
