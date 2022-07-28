let enhance = require('./vendor/enhance-ssr.js')
let { join } = require('path')
let { existsSync: exists, readdirSync: ls } = require('fs')

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

  if (exists(pathToModule)) {
    // read explicit elements manifest
    let els = await import(pathToModule)
    return els.default || els
  }
  else if (exists(pathToDirectory)) {
    // generate based on elements/ directory
    let els = {}
    let raw = ls(pathToDirectory)
    for (let e of raw) { 
      let tag = `el-${e.replace('.mjs', '')}`
      let mod = await import(join(pathToDirectory, e))
      els[tag] = mod.default
    }
    return els
  }
  else {
    // generate based on page.html or page.mjs requested 
    throw Error('cannot find `elements.mjs` or an `elements/` folder')
  }
}
