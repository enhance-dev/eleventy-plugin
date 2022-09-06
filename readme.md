# `@enhance/eleventy-plugin`

Build static websites with custom elements.

## Quickstart

Create a project.

``` bash
mkdir -p myproject && cd myproject
npm init -y
npm install @11ty/eleventy @enhance/eleventy-plugin
```

Add some handy shortcuts to `scripts` in `package.json`.

```json
{
  "scripts": {
    "start": "npx @11ty/eleventy --serve"
  }
}
```

Add the `@enhance/plugin-eleventy` to `.eleventy.js` config file.

```javascript
let plugin = require('@enhance/eleventy-plugin')

module.exports = function (eleventyConfig) {
  let extension = 'html'
  eleventyConfig.addTemplateFormats(extension)
  eleventyConfig.addExtension(extension, plugin)
}
```

Write some HTML.

```html
<!-- index.html -->
<my-header></my-header>
<strong>powerful html here</strong>
<my-footer></my-footer>
```

Define custom element templates in a folder named `elements`.

```javascript
/** elements/my-header.mjs */
export default function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

```javascript
/** elements/my-footer.mjs */
export default function footer ({ html, state }) {
  return html`
  <footer>
    <p>footer here</p>
    <pre>${ JSON.stringify(state, null, 2) }</pre>
  </footer>
  `
}
```

Run `npm start`, and preview at `http://localhost:8080`.

## Add data

Add `index.json` with some default data, and preview result in the footer.

```json
{
  "initialState": { "custom": "data", "is": "here" }
}
```

## Rename elements

If you want to configure your own element tag names create `./elements.mjs` to explicitly define tags:

```javascript
import header from './elements/my-header.mjs'
import footer from './elements/my-footer.mjs'

export default {
  'my-header': header,
  'my-footer': footer
}
```

> Don't forget to update your corresponding `index.html`!

