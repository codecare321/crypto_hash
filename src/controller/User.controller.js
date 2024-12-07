const User = require("../models/User");
const crypto = require("crypto");
const secretKey = "secret";
function decryptPassword(encryptedPassword) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    res.status(201).json({
      success: true,
      message: "Created User Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const decryptedPassword = decryptPassword(user.password);
      console.log("Decrypted password:", decryptedPassword);

      res.status(200).json({
        success: true,
        message: "User found",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  registerUser,
  getUser,
};
