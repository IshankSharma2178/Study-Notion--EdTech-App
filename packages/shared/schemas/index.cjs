// CommonJS index - Re-exports from individual .cjs files
// No duplication - all schemas come from their respective .cjs files

const authSchemas = require("./auth.cjs");
const courseSchemas = require("./course.cjs");
const profileSchemas = require("./profile.cjs");
const paymentSchemas = require("./payment.cjs");

// Re-export all schemas
module.exports = {
  ...authSchemas,
  ...courseSchemas,
  ...profileSchemas,
  ...paymentSchemas,
};
