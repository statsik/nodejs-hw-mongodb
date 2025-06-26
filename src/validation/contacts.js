import Joi from 'joi';

export const createContactSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page should be a number',
      'number.integer': 'Page should be an integer',
      'number.min': 'Page should be at least {#limit}'
    }),
    
  perPage: Joi.number().integer().min(1).max(100).default(10).messages({
      'number.base': 'Items per page should be a number',
      'number.integer': 'Items per page should be an integer',
      'number.min': 'Items per page should be at least {#limit}',
      'number.max': 'Items per page should be at most {#limit}'
    }),
    
  phoneNumber: Joi.string().min(3).max(20).required().messages({
      'string.base': 'Phone number should be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.min': 'Phone number should have at least {#limit} characters',
      'string.max': 'Phone number should have at most {#limit} characters',
      'any.required': 'Phone number is required'
    }),
    
  email: Joi.string().email().min(3).max(50).required().messages({
      'string.base': 'Email should be a string',
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email cannot be empty',
      'string.min': 'Email should have at least {#limit} characters',
      'string.max': 'Email should have at most {#limit} characters',
      'any.required': 'Email is required'
    }),
    
  contactType: Joi.string().valid('personal', 'home', 'work').required().messages({
      'string.base': 'Contact type should be a string',
      'string.empty': 'Contact type cannot be empty',
      'any.only': 'Contact type must be one of: personal, home, work',
      'any.required': 'Contact type is required'
    })
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name should be at least {#limit} characters long',
        'string.max': 'Name should not exceed {#limit} characters'
      }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'Phone number should be a string',
        'string.empty': 'Phone number cannot be empty',
        'string.min': 'Phone number should be at least {#limit} characters',
        'string.max': 'Phone number should not exceed {#limit} characters',
        'string.pattern.base': 'Please enter a valid phone number'
      }),
    email: Joi.string().min(3).max(20).messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please enter a valid email address',
        'string.min': 'Email should be at least {#limit} characters',
        'string.max': 'Email should not exceed {#limit} characters'
      }),
    contactType: Joi.string().min(3).max(20).messages({
        'string.base': 'Contact type should be a string',
        'string.empty': 'Contact type cannot be empty',
        'any.only': 'Contact type must be either personal, home or work'
      }),
  });