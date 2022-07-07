const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const register = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const user = await User.findOne({ email }).exec();
  if (user)
    return res.status(409).json({
      message: "email already exists",
    });

  try {
    const hash = await bcrypt.hash(password, 10);

    const result = await User.create({
      email,
      hash,
      firstname,
      lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const user = await User.findOne({ email }).exec();

  if (!user) return res.sendStatus(401);

  const match = bcrypt.compare(password, user.hash);

  if (!match) return res.sendStatus(401);

  delete user.hash;

  const accessToken = jwt.sign(
    {
      userInfo: user,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({ accessToken });
};

module.exports = { register, login };
