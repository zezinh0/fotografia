import mongoose from 'mongoose';

const imagensencomendadaSchema = new mongoose.Schema(
  {
    esc_id_image: { type: String, ref: 'Imagens', required: true },
    esc_id_tamanho: { type: String, ref: 'Grupo', required: true },
    quantity: { type: String, required: true },

    enco_id: { type: String, ref: 'Encomendas', required: true },
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
