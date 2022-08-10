import mongoose from 'mongoose';
import User from './modelUser.js';
const grupoSchema = new mongoose.Schema(
  {
    grupo_name: { type: String },
    grupo_codigo: { type: String, required: true, unique: true },
    grupo_privado: { type: String, required: true },
    grupo_medidas: { type: String },
    user_id: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Grupo = mongoose.model('Grupo', grupoSchema);

export default Grupo;
