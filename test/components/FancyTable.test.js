import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it } from 'vitest';
import { JSDOM } from 'jsdom';

import FancyTable from '@components/FancyTable.astro';

const theDOM = it.extend({
  dom: async ({}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(FancyTable));
    await use(dom)
  }
});

theDOM('does not contain h1 or h2 elements', async ({dom}) => {
  for (let q of ["h1", "h2"]) {
    const elements =  dom.window.document.querySelectorAll(q);
    expect(elements).toHaveLength(0);
  }
});
