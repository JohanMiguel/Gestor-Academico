import { Schema, model } from "mongoose";

const teacherSchema = Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxLength: [50, "First name cannot exceed 50 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxLength: [50, "Last name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        maxLength: [100, "Subject name cannot exceed 100 characters"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, 
{
    versionKey: false,
    timestamps: true
});

teacherSchema.methods.toJSON = function() {
    const { _id, ...teacher } = this.toObject();
    teacher.uid = _id;
    return teacher;
};

export default model("Teacher", teacherSchema);
