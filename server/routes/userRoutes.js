const { register } = require("module");
const bcrypt = require("bcrypt")
const User = require("../model/userModel");
const { login, setAvatar, getAllUsers } = require("../controllers/userController");




const router=require("express").Router();


router.post("/register", async (req, res) => {
    try {
        console.log("Received registration request:", req.body);

        // Example MongoDB user model
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Missing fields" });
        }

        // Hash password and save user (modify this based on your actual code)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        const savedUser = await newUser.save();
        console.log("User registered:", savedUser);

        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login",login)

router.post("/setAvatar/:id",setAvatar)

router.get('/allusers/:id',getAllUsers)

module.exports=router