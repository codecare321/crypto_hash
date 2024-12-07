const mongoose = require("mongoose");

const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,

      required: [true, "Please enter a password"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }

//     const hashedPassword = await bcrypt.hash(this.password, 10);
//     this.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

const secretKey = "secret";

function encryptedPassword(password) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = encryptedPassword(this.password);
  return next();
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
