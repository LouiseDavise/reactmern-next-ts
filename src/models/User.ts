import mongoose, {Schema, model, models} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: { 
        type: Number 
    },
    birthday: {
        type: Date 
    },
    phoneNumber: {
        type: String 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const User = models.User || model("User", userSchema);