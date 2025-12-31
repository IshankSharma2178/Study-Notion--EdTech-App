// CommonJS wrapper for profile.js (ESM)
// No duplication - just re-exports from the ESM source
module.exports = require("module").createRequire(require("path").resolve(__dirname, "profile.js"))("./profile.js");
