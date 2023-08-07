import Joi from "joi";

export const validateRegister = Joi.object({
  name: Joi.string().required().trim().min(3).messages({
    'string.empty': 'The name field must not be left empty.',
    'any.required': 'The name field is required.',
    'string.min': 'The name must be at least 3 characters long.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address.',
    'any.required': 'The email field is required.',
  }),
  phone: Joi.string().required().regex(/^0\d{9,}$/).messages({
    'any.required': 'The phone field is required.',
    'string.empty': 'The phone field must not be left empty.',
    'string.pattern.base': 'Please enter a valid phone number.',
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "The password field is required.",
    "string.empty": "The password field must not be left empty.",
    "string.min": "The password must be at least 6 characters long.",
  }),
  confirmPassword: Joi.required().valid(Joi.ref("password")).messages({
    "any.required": "The confirmPassword field is required.",
    "string.empty": "The confirmPassword field must not be left empty.",
    "any.only": "The password confirmation must match the password.",
  }),
});

export const validateLogin = Joi.object({
  
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address.',
      'any.required': 'The email field is required.',
    }),
    password: Joi.string().required().min(6).messages({
      "any.required": "The password field is required.",
      "string.empty": "The password field must not be left empty.",
      "string.min": "The password must be at least 6 characters long.",
    })
  });