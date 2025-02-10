import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    nameSubject: {
        type: String,
        required: [true, "Class name is required"],
    },
    gestor: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
      },
    status: {
        type: Boolean,
        default: true
    }
}, { 
    versionKey: false,  
    timestamps: true    
});

export default model('Subject', subjectSchema);
