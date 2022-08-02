import mongoose from 'mongoose';

const encomendasSchema = new mongoose.Schema(
  {
    enco_clientename: { type: String, required: true },
    enco_morada: { type: String, required: true },
    enco_nif: { type: String, required: true },
    enco_info: { type: String, required: true },
    enco_preco: { type: String, required: true },
    enco_pagamanto: { type: Number, required: true },
    enco_estado: { type: String, required: true },
    enco_fechada: { type: Number, required: true },
    enco_metodoP: { type: String, required: true },
    grupo_id: { type: Schema.Types.ObjectId, ref: 'Grupo', required: true },
  },
  {
    timestamps: true,
  }
);

const Encomendas = mongoose.model('Encomendas', encomendasSchema);

export default Encomendas;
