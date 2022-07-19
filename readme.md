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

Write some HTML.

```bash
echo "<my-header></my-header>" > index.html
echo "<strong>powerful html here</strong>" >> index.html
echo "<my-footer></my-footer>" >> index.html
```

Create some custom elements in a folder named `elements`.

```javascript
/** elements/header.mjs */
export default async function header ({ html }) {
  return html`<header> my cool header</header>`
}
```

```javascript
/** elements/footer.mjs */
export default async function header ({ html, state }) {
  return html`
  <footer>
    <p>footer here</p>
    <pre>${ JSON.stringify(state, null, 2) }</pre>
  </footer>
  `
}
```

Create `elements/elements.mjs` to define custom elements tag names.

```javascript
import header from './header.mjs'
import footer from './header.mjs'

let elements = {
  'my-header': header,
  'my-footer': footer
}

export default elements
```

Run `npm start` and preview at `http://localhost:8080`.
