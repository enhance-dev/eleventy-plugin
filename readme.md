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
    "start": "npx @11ty/eleventy"
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
<el-header></el-header>
<strong>powerful html here</strong>
<my-footer></my-footer>
```

Define custom element templates in a folder named `elements`.

```javascript
/** elements/header.mjs */
export default function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

```javascript
/** elements/footer.mjs */
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

If you want to configure your own element tag names create `elements.mjs` to explicitly define tags:

```javascript
import header from './elements/header.mjs'
import footer from './elements/footer.mjs'

export default {
  'sweet-header': header,
  'sweet-footer': footer
}
```

> Don't forget to update your coresponding `index.html`!

