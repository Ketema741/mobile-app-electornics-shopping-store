const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator')

const auth = require("../middleware/auth");
const User = require('../models/User')
const cloudinary = require("cloudinary");



// @route     GET api/Users
// @desc      Get all Users
// @access    Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({
      date: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    GET api/users
// @desc     Get single user
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: req.params.id });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route       POST api/users
// @desc        register a user
// @access      public
router.post(
  '/',
  [
    check("name", "please add name").not().isEmpty(),
    check("email", "please include a valid email!").isEmail(),
    check("password", "please enter a password with 6 or more characters")
      .isLength({ min: 6 }),
    check("address", "please add adress").not().isEmpty()

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      address,
    } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'user already exists' });
      }

      user = new User({
        name,
        email,
        password,
        address,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );



    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route     PUT api/house/:id
// @desc      Update house
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const {
    name,
    email,
    password,
    address,
  } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (address) userFields.address = address;


  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "user not found" });

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/cart/:id", async (req, res) => {
  try {

    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { favourites: req.body } }
    )

    user = await User.save()
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/removefromcart/:id", async (req, res) => {
  try {

    let user = await User.updateOne(
      { _id: req.params.id },
      { $pull: { favourites: { houseId: req.body.favouriteId } } }
    )

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// @route     DELETE api/users/:id
// @desc      Delete user
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "user not found" });
    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: "user removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("api_key"),
  api_secret: config.get("api_secret"),
});





module.exports = router;