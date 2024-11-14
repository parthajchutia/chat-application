import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  console.log(req.body);

  const avatar = {
    public_id: "Sdfsd",
    url: "asdf",
  };
  const user = await User.create({
    name,
    bio,
    username,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User created");
};

const login = TryCatch(async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid Username" });

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    sendToken(res, user, 200, `Welcome back,${user.name} `);
  } catch (error) {
    
  }
}
 );

const getMyProfile = async (req, res) => {};

export { login, newUser, getMyProfile };
