import expressJwt from "express-jwt";
import Add from "../models/add";

export const requireSignIn = expressJwt({
  //Secret, expireDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const addOwner = async (req, res, next) => {
  let add = await Add.findById(req.params.addId).exec();
  // console.log(add.postedBy._id === req.user.id);
  if (!add.postedBy._id === req.user.id) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
