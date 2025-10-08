const Joi = require("joi");

const EmailDTO = Joi.string().email().required()
const PasswordDTO = Joi.string().min(8).max(25).required()

const RegisterDTO = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: EmailDTO,
    password: Joi.string().regex( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d!@#$%^&*()_]{8,25}$/).required(),
    confirmPassword: Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only": "password and confirmPassword must be same"
    }),
    phone: Joi.string().regex(/^(?:\+977[- ]?)?(?:\d{1,3}[- ]?)?\d{6,10}$/).allow(null, '').optional().default(null),
    address: Joi.object({
        billingAddress: Joi.string().max(100).allow(null, "").default(null),
        shippingAddress: Joi.string().max(100).allow(null, "").default(null),
    }).allow(null, "").default(null),
    role: Joi.string().regex(/^(customer|seller|admin)$/i).default("customer"),
    gender: Joi.string().regex(/^(male|female|other)$/).optional().default(null),
    image: Joi.string().allow(null, "").optional().default(null),
    dob: Joi.date().allow(null,"").optional().default(null)
})

const LoginDTO = Joi.object({
    email: EmailDTO,
    password: PasswordDTO
})

const ResetPasswordRequestDTO = Joi.object({
    email: EmailDTO
})

module.exports = {
    RegisterDTO,
    LoginDTO,
    ResetPasswordRequestDTO
}