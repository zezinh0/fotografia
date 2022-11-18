import mongoose from 'mongoose';
import User from './modelUser.js';
const grupoSchema = new mongoose.Schema(
  {
    grupo_name: { type: String },
    grupo_codigo: { type: String, required: true, unique: true },
    grupo_privado: { type: Boolean, required: true },
    grupo_download: { type: Boolean, required: true },
    grupo_download_price: { type: String },
    grupo_download_id: { type: String },
    grupo_discount: [
      {
        id: { type: String },
        name: { type: String },
        number: { type: String },
      },
    ],
    grupo_delivery: [
      {
        id: { type: String },
        title: { type: String },
        price: { type: String },
      },
    ],
    grupo_medidas: [
      {
        id: { type: String },
        largura: { type: String },
        altura: { type: String },
        price: { type: String },
      },
    ],
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
