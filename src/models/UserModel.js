import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  isSuperAdmin: Boolean,
  isAdmin: Boolean,
  tokens: [{ type: Object }],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.isSuperAdmin;
    delete returnedObject.__v;
  },
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
