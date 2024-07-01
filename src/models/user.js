"use strict";
/* -------------------------------------------------------
    EXPRESSJS - DEFI Project
------------------------------------------------------- */

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    
    name: {
      type: String,
      trim: true,
      required: true,
    },

    surname: {
        type: String,
        trim: true,
      },
  
    dateOfBirth:{
        type:Date,
        trim:true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female"],
      },
  
      password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password),
      },
      
      verified: {
        type: Boolean,
        default: false,
      },

      isAdmin:{
        type:Boolean,
        default:false
      },


    avatar: {
      type: String,
      trim: true,
      default:
        "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.laptoppcapk.com%2Ffitness-point%2F&psig=AOvVaw0gWJzVmLitXNL91MZXqtOu&ust=1719788775218000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCU5sv2gYcDFQAAAAAdAAAAABAJ",
    },
    sportBranch:[
      {
        type: String,
      }
    ]

  },
  { timestamps: true, collection: "user" }
);


module.exports = mongoose.model("User", UserSchema);

