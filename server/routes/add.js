import express from "express";
import formidable from "express-formidable";
import { requireSignIn, addOwner } from "../middlewares";

const router = express.Router();

import {
  createAdd,
  adds,
  image,
  postedHotels,
  remove,
  read,
} from "../controllers/add";

router.post("/create-add", requireSignIn, formidable(), createAdd);
router.get("/adds", adds);
router.get("/add/image/:addId", image);
router.get("/posted-adds", requireSignIn, postedHotels);
router.delete("/delete-add/:addId", requireSignIn, addOwner, remove);
router.get("/add/:addId", read);

module.exports = router;
