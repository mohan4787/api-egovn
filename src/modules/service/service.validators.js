const Joi = require("joi");
const { Status } = require("../../config/constants"); 

const ServiceCreateDTO = Joi.object({
  title: Joi.string().min(2).required(),
  fee: Joi.number().min(0).default(0),
  description: Joi.string().required(),
  requiredDocuments: Joi.array().items(Joi.string()).optional(),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
    .default(Status.INACTIVE)  
}).unknown();

const ServiceUpdateDTO = Joi.object({
  title: Joi.string().min(2).required(),
  fee: Joi.number().min(0),
  description: Joi.string().required(),
  requiredDocuments: Joi.array().items(Joi.string()),
  status: Joi.string()
    .regex(/^(active|inactive)$/)
}).unknown();

module.exports = {
  ServiceCreateDTO,
  ServiceUpdateDTO
};
