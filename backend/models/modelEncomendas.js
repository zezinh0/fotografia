import mongoose from 'mongoose';

const encomendasSchema = new mongoose.Schema(
  {
    enco_namepro: { type: String, required: true },
    enco_nameapl: { type: String, required: true },
    enco_email: { type: String, required: true },
    enco_telemovel: { type: String },
    enco_morada: { type: String },
    enco_pais: { type: String },
    enco_postal: { type: String },
    enco_cidade: { type: String },
    enco_nif: { type: String },
    enco_info: { type: String },
    enco_total: { type: String, required: true },
    enco_pagamanto: { type: String, required: true },
    enco_estado: { type: String, required: true },
    enco_fechada: { type: String },
    enco_metodoP: { type: String, required: true },
    enco_shippingt: { type: String },
    enco_shippingp: { type: String },
    enco_shippingid: { type: String },
    enco_disid: { type: String },
    enco_disname: { type: String },
    enco_disnum: { type: String },
    grupo_id: { type: String, ref: 'Grupo', required: true },
    user_email: { type: String, ref: 'User', required: true },
    user_id: { type: String, ref: 'User', required: true },
    enco_num: { type: String, required: true },
    enco_distrito: { type: String },
    enco_processada: { type: String },
    enco_enviada: { type: String },
    enco_entregue: { type: String },
    enco_subtotal: { type: String },
  },
  {
    timestamps: true,
  }
);

const Encomendas = mongoose.model('Encomendas', encomendasSchema);

export default Encomendas;
