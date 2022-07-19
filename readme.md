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

```bash
echo "<my-header></my-header>" > index.html
echo "<strong>powerful html here</strong>" >> index.html
echo "<my-footer></my-footer>" >> index.html
```

Create some custom elements in a folder named `elements`.

```javascript
/** elements/header.mjs */
export default function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

```javascript
/** elements/footer.mjs */
export default function header ({ html, state }) {
  return html`
  <footer>
    <p>footer here</p>
    <pre>${ JSON.stringify(state, null, 2) }</pre>
  </footer>
  `
}
```

Create `elements/elements.mjs` to define custom element tag names.

```javascript
import header from './header.mjs'
import footer from './footer.mjs'

let elements = {
  'my-header': header,
  'my-footer': footer
}

export default elements
```

Run `npm start`, and preview at `http://localhost:8080`.

---

Add `index.json` with some default data, and preview result in the footer.

```json
{
  "initialState": { "custom": "data", "is": "here" }
}
```

