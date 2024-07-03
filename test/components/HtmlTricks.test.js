import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import HtmlTricks from '@components/HtmlTricks.astro';

const theDOM = it.extend({
  dom: async ({}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(HtmlTricks));
    await use(dom)
  }
})

theDOM('should explain the use of this page', async ({dom}) => {
  const headline = dom.window.document.querySelector("h1").textContent;
  expect(headline).toBe("HTML Tricks");
  const subtitle = dom.window.document.querySelector("aside")
  expect(subtitle.textContent).toMatch(
    "This page contains some useful HTML tricks.");
  });

theDOM('contains a list of h2 headings by topics', async ({dom}) => {
  const topics = [
    "Text Formatting",
    "Flexbox",
    "Tables",
    "Forms",
    "Components",
    "HTMX",
  ];
  for (let i = 0; i < topics.length; i++) {
    const msg = dom.window.document.querySelector(`h2:nth-of-type(${i+1})`).textContent;
    expect(msg).toBe(topics[i]);
  }
});
