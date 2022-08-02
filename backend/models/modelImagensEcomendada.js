import mongoose from 'mongoose';

const imagensencomendadaSchema = new mongoose.Schema(
  {
    imagenc_id: { type: String, required: true },
    enco_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ImagensEncomendada = mongoose.model(
  'ImagensEncomendada',
  imagensencomendadaSchema
);

export default ImagensEncomendada;
