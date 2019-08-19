import * as joi from 'joi';

const schema: joi.ObjectSchema = joi.object({
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
});

export { schema };
