const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: "user" 
    },
    cartData: { 
        type: Object, 
        default: {} 
    },
  },
  { minimize: false }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
