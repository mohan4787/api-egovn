const Joi = require("joi");

const BannerCreateDTO = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  link: Joi.string().uri().allow(null, '').default(null).optional(),
  status: Joi.string().regex(/^(active|inactive)$/).default('inactive'),
  image: Joi.string().allow(null,'').default(null)
})

const BannerUpdateDTO = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  link: Joi.string().uri().allow(null, '').default(null).optional(),
  status: Joi.string().regex(/^(active|inactive)$/).default('inactive'),
  image: Joi.string().allow(null,'').default(null)
})

module.exports = {
  BannerCreateDTO,
  BannerUpdateDTO,
};