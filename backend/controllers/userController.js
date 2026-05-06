import User from "../models/User.js";

// 🔥 Get all users
export const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};

// 🔥 Delete user
export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
};