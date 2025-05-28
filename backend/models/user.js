import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "company", "admin"], default: "user" },
  balance: { type: Number, default: 0 },
  creditInfo: {
    type: {
      cvv: { type: Number, maxlength: 3, minlength: 3 },
      credit_number: { type: Number, maxlength: 16, minlength: 16 },
      expiary: { type: Number, maxlength: 4, minlength: 4 },
    },
  },
  img: { type: String, default: "" },
});

export const User = mongoose.model("User", userSchema);
