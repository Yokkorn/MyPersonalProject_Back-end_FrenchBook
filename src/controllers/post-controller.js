const fs = require("fs");
const {
  validateCreatePost,
} = require("../validators/post-validator");
const cloudinary = require("../utils/cloudinary");
const {
  Post,
  Friend,
  User,
  Like,
  Comment,
} = require("../models");
const { FRIEND_ACCEPTED } = require("../config/constant");
const { Op } = require("sequelize");
const createError = require("../utils/create-error");

exports.createPost = async (req, res, next) => {
  try {
    const value = validateCreatePost({
      title: req.body.title,
      image: req.file?.path,
    });

    if (value.image) {
      value.image = await cloudinary.upload(value.image);
    }
    value.userId = req.user.id;
    const post = await Post.create(value);

    res.status(201).json({ value });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
