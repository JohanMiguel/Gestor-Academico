import { Schema, model } from "mongoose";
// se hace el modelo de Subjec
const subjectSchema = new Schema({
    nameSubject: {
        type: String,
        required: [true, "Class name is required"],
    },
    gestor: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher', // se hace refencia a Teacher ya que se trabajara con conexion
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
