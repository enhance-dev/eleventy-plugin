let plugin = require('./plugin.js')

module.exports = function (eleventyConfig) {
  let extension = 'html'
  eleventyConfig.addTemplateFormats(extension)
  eleventyConfig.addExtension(extension, plugin)
  eleventyConfig.addWatchTarget("./elements/**/*.mjs")
}
