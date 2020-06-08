const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true
  },

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  passwordConfirm: {
    type: String,
    required: true
  },

  role: {
    type: Number,
    enum: ["regular", "owner", "admin"]
  }
});

UserSchema.methods.getAuthToken = function getAuthToken() {
  const token = jwt.sign({ _id: this._id, role: this.role }, "secret", {
    expiresIn: "30d"
  });

  return token;
};

UserSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    this.passwordConfirm = hash;
    next();
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

const createUser = user => {
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
    role: Joi.number()
      .integer()
      .optional()
  });
};

module.exports = {
  User,

  createValidate: createUser
};
