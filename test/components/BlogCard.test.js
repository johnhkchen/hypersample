import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { faker } from '@faker-js/faker';
import BlogCard from '@components/BlogCard.astro';

const theDOM = it.extend({
  title: async ({}, use) => {
    const title = faker.company.catchPhrase();
    await use(title);
  },
  subtitle: async ({}, use) => {
    const subtitle = faker.company.catchPhrase();
    await use(subtitle);
  },
  date: async ({}, use) => {
    const date = faker.date.soon().toDateString();
    await use(date);
  },
  url: async ({}, use) => {
    const url = faker.internet.url();
    await use(url);
  },
  slug: async ({title}, use) => {
    // snake case
    const slug = title.replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
    await use(slug);
  },
  dom: async ({title, subtitle, date, url, slug}, use) => {
    const container = await AstroContainer.create();
    const dom = new JSDOM(await container.renderToString(BlogCard, {
      props: {
        title: title,
        subtitle: subtitle,
        date: date,
        url: url,
        slug: slug,
      },
    }));
    await use(dom)
  }
});

theDOM('has title in <h3>', async ({title, dom}) => {
  const el = dom.window.document.querySelector("h3");
  expect(el.textContent).toBe(title);
});

theDOM('shows date in <p>', async ({date, dom}) => {
  const el = dom.window.document.querySelector("p");
  expect(el.textContent).toBe(date);
});

theDOM('has subtitle in <sub-title>', async ({subtitle, dom}) => {
  const el = dom.window.document.querySelector(`sub-title`);
  expect(el.textContent).toBe(subtitle);
});

theDOM('references article slug in <a> element', async ({slug, dom}) => {
  const el = dom.window.document.querySelector("a");
  expect(el.href).toMatch(slug);
});

theDOM('shows prop url in another <a> element', async ({url, dom}) => {
  const el = dom.window.document.querySelector("a:nth-of-type(2)");
  expect(el.href).toMatch(url);
});
