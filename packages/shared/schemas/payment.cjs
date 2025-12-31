// CommonJS wrapper for payment.js (ESM)
// No duplication - just re-exports from the ESM source
module.exports = require("module").createRequire(require("path").resolve(__dirname, "payment.js"))("./payment.js");
