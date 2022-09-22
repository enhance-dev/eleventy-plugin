import { importWithoutCache } from './utils.js'

const header = await importWithoutCache('./elements/my-header.mjs')
const footer = await importWithoutCache('./elements/my-footer.mjs')

export default {
  'my-header': header.default,
  'my-footer': footer.default
}
