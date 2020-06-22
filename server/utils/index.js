const Joi = require("joi");

function hasRole(roles) {
  return (req, res, next) => {
    if (roles.indexOf(req.user.role) > -1) {
      next();

      return;
    }
    res.status(403).send({ message: "Permission denied." });
  };
}

function createValidate(user) {
  return Joi.validate(user, {
    firstName: Joi.string()
      .min(1)
      .max(50)
      .required(),
    lastName: Joi.string()
      .min(1)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "Both password need to be the same"
          }
        }
      }),
    role: Joi.string()
      .valid("admin", "owner", "regular")
      .required()
  });
}

function updateValidate(user) {
  return Joi.validate(user, {
    firstName: Joi.string()
      .min(1)
      .max(50)
      .optional(),
    lastName: Joi.string()
      .min(1)
      .max(50)
      .optional(),
    email: Joi.string()
      .min(5)
      .max(50)
      .optional()
      .email(),
    password: Joi.string().optional(),
    passwordConfirm: Joi.string()
      .optional()
      .valid(Joi.ref("password"))
      .options({
        language: {
          any: {
            allowOnly: "Both password need to be the same"
          }
        }
      }),

    role: Joi.string()
      .valid("admin", "owner", "regular")
      .optional()
  });
}

module.exports = {
  hasRole,
  createValidate,
  updateValidate
};
