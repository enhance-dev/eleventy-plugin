let enhance = require('./vendor/enhance-ssr.js')
let { join } = require('path')
let { existsSync: exists, readdirSync: ls } = require('fs')
let { importWithoutCache } = require('./utils')
let { pathToFileURL } = require('url')

module.exports = {
  async compile (inputContent) {
    return async function compiler ({ initialState={} }) {
      let elements = await read()
      let html = enhance({ elements, initialState })
      return html`${ inputContent }`
    }
  }
}

async function read () {

  let pathToModule = join(process.cwd(), 'elements.mjs')
  let pathToDirectory = join(process.cwd(), 'elements')
  let pathToComponents = join(process.cwd(), 'components')
  let els = {}

  if (exists(pathToModule)) {
    // read explicit elements manifest
    let els = await importWithoutCache(pathToModule)
    return els.default || els
  }
  else if (exists(pathToDirectory) || exists(pathToComponents)) {
    // generate based on elements/ directory
    // let els = {}
    if (exists(pathToDirectory)) {
      let raw = ls(pathToDirectory)
      for (let e of raw) {
        let tag = e.replace('.mjs', '')
        let mod = await importWithoutCache(join(pathToDirectory, e))
        els[tag] = mod.default
      }
    }
    if (exists(pathToComponents)) {
      let raw = ls(pathToComponents)
      for (let e of raw) {
        let tag = e.replace('.mjs', '')
        const fileURL = pathToFileURL(join(pathToComponents, e))

        // import the element and add to the map
        try {
          let { default: component } = await import(fileURL.href)
          let render = component.render || component.prototype.render
          if (render) {
            els[tag] = function BrowserElement ({ html, state }) {
              return render({ html, state })
            }
          }
        }
        catch (error) {
          throw new Error(`Issue importing component: ${e}`, { cause: error })
        }
      }
    }
  }
  else {
    // generate based on page.html or page.mjs requested
    throw Error('cannot find `elements.mjs` or an `elements/` folder')
  }
  return els
}
