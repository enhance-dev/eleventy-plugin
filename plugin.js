let enhance = require('./vendor/enhance-ssr.js')
let path = require('path')
let fs = require('fs')

module.exports = {
  async compile (inputContent) {
    return async function compiler ({ initialState={} }) {
      let pathToEls = path.join(process.cwd(), 'elements', 'elements.mjs')
      if (!fs.existsSync(pathToEls))
        throw Error('elements/elements.mjs not found')
      let elements = await import(pathToEls)
      let html = enhance({ elements, initialState })
      return html`${ inputContent }`
    }
  }
}
