import mongoose from 'mongoose';

const imagensSchema = new mongoose.Schema(
  {
    imag_caminho: { type: String, required: true },
    imag_name: { type: String, required: true },
    grupo_id: { type: String, ref: 'Grupo', required: true },
  },
  {
    timestamps: true,
  }
);

const Imagens = mongoose.model('Imagens', imagensSchema);

export default Imagens;
