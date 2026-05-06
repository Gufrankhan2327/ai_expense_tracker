import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 👤 GET PROFILE
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// ✏️ UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Update failed" });
    }
};

// 🔐 CHANGE PASSWORD
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Old password incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ msg: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ msg: "Password update failed" });
    }
};