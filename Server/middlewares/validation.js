const { z } = require("zod");

const validate = (schema, location = "body") => {
  return (req, res, next) => {
    try {
      let dataToValidate;

      switch (location) {
        case "body":
          dataToValidate = req.body;
          break;
        case "params":
          dataToValidate = req.params;
          break;
        case "query":
          dataToValidate = req.query;
          break;
        case "all":
          dataToValidate = {
            body: req.body,
            params: req.params,
            query: req.query,
          };
          break;
        default:
          dataToValidate = req.body;
      }

      // Validate the data
      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        // Format Zod errors into a readable format
        const errors = result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors,
        });
      }

      // Replace the original data with validated (and potentially transformed) data
      if (location === "body") {
        req.body = result.data;
      } else if (location === "params") {
        req.params = result.data;
      } else if (location === "query") {
        req.query = result.data;
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
  };
};

module.exports = { validate };
