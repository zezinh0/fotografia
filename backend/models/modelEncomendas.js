import mongoose from 'mongoose';

const encomendasSchema = new mongoose.Schema(
  {
    enco_namepro: { type: String, required: true },
    enco_nameapl: { type: String, required: true },
    enco_email: { type: String, required: true },
    enco_telemovel: { type: String },
    enco_morada: { type: String, required: true },
    enco_pais: { type: String, required: true },
    enco_postal: { type: String, required: true },
    enco_cidade: { type: String, required: true },
    enco_nif: { type: String },
    enco_info: { type: String },
    enco_preco: { type: String, required: true },
    enco_pagamanto: { type: String, required: true },
    enco_estado: { type: String, required: true },
    enco_fechada: { type: String, required: true },
    enco_metodoP: { type: String, required: true },
    enco_metodoEt: { type: String, required: true },
    enco_metodoEp: { type: String, required: true },
    grupo_id: { type: String, ref: 'Grupo', required: true },
    enco_num: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Encomendas = mongoose.model('Encomendas', encomendasSchema);

export default Encomendas;
