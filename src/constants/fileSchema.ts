import joi from '@hapi/joi';

const fileSchema = joi.object({
  arrivals: joi.object(),
  rndNumbers: joi.array().items(joi.number().min(0)),
  queues: joi.array().items(joi.object({
    name: joi.string().required(),
    servers: joi.number().min(1).required(),
    capacity: joi.number().default(Infinity),
    arrival: joi.object({
      min: joi.number(),
      max: joi.number(),
    }).required(),
    service: joi.object({
      min: joi.number(),
      max: joi.number(),
    }).required(),
  })),
  network: joi.array().items(joi.object({
    src: joi.string().required(),
    dst: joi.string().required(),
    probability: joi.number().min(0.0001).max(1).required(),
  })),
});

export { fileSchema };
