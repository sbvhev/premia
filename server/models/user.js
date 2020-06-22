const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
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
      type: String,
      enum: ["regular", "owner", "admin"],
      required: true
    }
  },
  { versionKey: false }
);

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

module.exports = mongoose.model("user", UserSchema);
