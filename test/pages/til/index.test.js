import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

import Index from '@pages/til/index.astro';

const theDOM = it.extend({
  dom: async ({}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(Index));
    await use(dom)
  }
});

theDOM('has two TILs', async ({dom}) => {
  const topics = [
    "Missing Style",
    "Vitest in Astro",
  ];
  const els = dom.window.document.querySelectorAll(`h3`);
  els.forEach(function(e, i) {
    expect(e.textContent).toBe(topics[i]);
  });
});
