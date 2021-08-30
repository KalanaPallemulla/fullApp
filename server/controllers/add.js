import Add from "../models/add";
import fs from "fs";

export const createAdd = async (req, res) => {
  //   console.log("req.fields", req.fields);
  // console.log("req.files", req.files);

  try {
    let fields = req.fields;
    let files = req.files;

    let add = new Add(fields);

    //handle image
    if (files.image) {
      add.image.data = fs.readFileSync(files.image.path);
      add.image.contentType = files.image.type;
    }

    add.postedBy = req.user._id;

    add.save((err, result) => {
      if (err) {
        console.log("Add saving error: ", err);
        res.status(400).json("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log("This error is in add controller: ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const adds = async (req, res) => {
  let all = await Add.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.json(all);
};

export const image = async (req, res) => {
  let add = await Add.findById(req.params.addId).exec();
  if (add && add.image && add.image.contentType) {
    res.set("Content-Type", add.image.contentType);
    return res.send(add.image.data);
  }
};

export const postedHotels = async (req, res) => {
  let all = await Add.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Add.findByIdAndDelete(req.params.addId).exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let add = await Add.findById(req.params.addId).select("-image.data").exec();
  res.json(add);
  console.log("Single Add");
};
