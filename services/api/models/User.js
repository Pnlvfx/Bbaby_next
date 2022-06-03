import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        unique:true,
        required:[true, "Please enter your email!"],
        trim: true,
    },
    username: {
        type:String,
        unique:true,
        required:[true, "can't be blank"],
        trim: true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/bbabystyle/image/upload/v1652554985/avatar_aqlsee.png"
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', UserSchema);

export default User;