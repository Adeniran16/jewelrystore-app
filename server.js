const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://admin:password@localhost:27017/Users?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));