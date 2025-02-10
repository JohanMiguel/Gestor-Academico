import { Schema, model } from "mongoose";

const studentSchema = Schema({
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
    grade: {
        type: String,
        required: true
    },
    subjects: {
        type: Schema.Types.ObjectId,
        ref: 'Subject', 
        required: false
      },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

studentSchema.methods.toJSON = function() {
    const { _id, ...student } = this.toObject();
    student.uid = _id;
    return student;
};

export default model("Student", studentSchema);
