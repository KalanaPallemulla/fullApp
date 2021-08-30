import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const addSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: "Company name is required",
    },
    email: {
      type: String,
      require: "Company email is required",
    },
    province: {
      type: String,
      require: "Company province is required",
    },
    city: {
      type: String,
      require: "Company city is required",
    },
    zip: {
      type: Number,
    },
    website: {
      type: String,
    },
    position: {
      type: String,
      require: "Job position is required",
    },
    salary: {
      type: Number,
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    about: {
      type: String,
      maxlength: 10000,
      require: "Job description is required",
    },
    header: {
      type: String,
      require: "Header is required",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Add", addSchema);
