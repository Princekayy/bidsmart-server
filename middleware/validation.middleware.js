import Joi from 'joi';

export const validate = (...schemas) => (req, res, next) => {
  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  try {
    for (const schema of schemas) {
      if (schema.body) {
        const { error, value } = schema.body.validate(req.body, options);
        if (error) {
          return res.status(400).json({
            error: error.details.map((err) => err.message)
          });
        }
        req.body = value;
      }

      if (schema.params) {
        const { error, value } = schema.params.validate(req.params, options);
        if (error) {
          return res.status(400).json({
            error: error.details.map((err) => err.message)
          });
        }
        req.params = value;
      }

      if (schema.query) {
        const { error, value } = schema.query.validate(req.query, options);
        if (error) {
          return res.status(400).json({
            error: error.details.map((err) => err.message)
          });
        }
        req.query = value;
      }
    }

    next(); // If validation passes, continue to the next middleware
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
