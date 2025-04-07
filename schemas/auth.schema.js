import Joi from 'joi'

export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validates email format
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format'
    }),

  

  password: Joi.string()
    .min(8) // Minimum 8 characters
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')) // At least one uppercase, one lowercase, one digit, and one special character
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    }),
    phone: Joi.string().required(),
  username: Joi.string()
    .alphanum() // Allows only letters and numbers
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Username is required',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must not exceed 30 characters',
      'string.alphanum': 'Username can only contain letters and numbers'
    })
});

export const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } }) // Validates email format
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format'
      }),
  
    password: Joi.string()
      .min(8) // Minimum 8 characters
      .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')) // At least one uppercase, one lowercase, one digit, and one special character
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
      }),
  });
