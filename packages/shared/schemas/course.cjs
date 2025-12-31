// CommonJS wrapper for course.js (ESM)
// No duplication - just re-exports from the ESM source
module.exports = require("module").createRequire(require("path").resolve(__dirname, "course.js"))("./course.js");

