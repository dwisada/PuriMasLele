// Validation
const Joi = require('joi')

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

// Login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

// Orang validation
const orangValidation = (data) => {
  const schema = Joi.object({
    prefix: Joi.string().required().valid('kak', 'bu', 'pak'),
    name: Joi.string().min(3).required().pattern(/^[A-Za-z\s]+$/).messages({
      'string.pattern.base': `name format can only be alphabet (a-z,A-Z)`
    }),
    status: Joi.array().min(1).required().items(Joi.string())
  })
  return schema.validate(data)
}

// Reset Password validation
const resetPassValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}

module.exports = {
  registerValidation,
  loginValidation,
  resetPassValidation,
  orangValidation
}