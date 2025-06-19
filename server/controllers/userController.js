const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };




  // module.exports.login = async (req, res, next) => {
  //   try {
  //     const { username,  password } = req.body;
  //     const user = await User.findOne({ username });
  //     if (!user)
  //       return res.json({ msg: "Incorrect username or password", status: false });
  //     const isPasswordValid=await bcrypt.compare(password,User.password);
  //     if(!isPasswordValid)
  //       return res.json({msg:"Incorrect username or password",status:false});
  //     delete User.password;
  //     return res.json({ status: true, User });
  //   } catch (ex) {
  //     next(ex);
  //   }
  // };


  module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }

        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;

        return res.json({ status: true, user: userWithoutPassword });
    } catch (ex) {
        next(ex);
    }
};

  module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        
        if (!avatarImage) {
            return res.json({ 
                msg: "Avatar image is required", 
                status: false,
                isSet: false 
            });
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage: avatarImage
            },
            { new: true }
        );

        if (!userData) {
            return res.json({ 
                msg: "User not found", 
                status: false,
                isSet: false 
            });
        }

        return res.json({
            isSet: true,
            image: avatarImage,
            status: true
        });
    } catch (ex) {
        next(ex);
    }
};

  module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } })
            .select([
                "email",
                "username",
                "avatarImage",
                "_id",
                "isAvatarImageSet"
            ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};
