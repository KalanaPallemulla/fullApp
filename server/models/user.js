import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: "Name is required",
      trim: true,
    },
    email: {
      type: String,
      require: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      require: "Password is required",
      min: 6,
      max: 64,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR: ", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD ERROR: ", err);
      return next(err, false);
    }
    //no error we get null
    console.log("MATCH PASSWORD");
    return next(null, match);
  });
};

export default mongoose.model("User", userSchema);
