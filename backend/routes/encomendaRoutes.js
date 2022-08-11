import express, { application } from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
import ImagensEncomendada from '../models/modelImagensEcomendada.js';
import Imagens from '../models/modelImagens.js';
import Stripe from 'stripe';
import Encomendas from '../models/modelEncomendas.js';
const encomendaRouter = express.Router();
const stripe = new Stripe(
  'sk_test_51LSXm2GgBxYtUt4KgTEAMsBl6jjPbmdTy5DnQKDFxIJCsYlZ41Ltirw8LwCpvgigGyBbhM6eBHnP0cI0YMqO6o6800X3xpdP1F'
);

encomendaRouter.get(
  '/imagens/:enco_id',
  asyncHandler(async (req, res) => {
    const imagensEcomendada = await ImagensEncomendada.find({
      enco_id: req.params.enco_id,
    });

    if (imagensEcomendada) {
      var enviar = [];

      let aux = imagensEcomendada[0].imagenc_id.split(',');
      for (let i = 0; i < aux.length - 1; i++) {
        let find = await Imagens.find({ _id: aux[i].split('-')[0] });

        enviar.push({
          name: find[0].imag_name,
          caminho: find[0].imag_caminho,
          tamanho: aux[i].split('-')[1],
        });
      }

      res.send(enviar);
    } else {
      res.status(404).send({ message: 'Erro ao buscar as Imagens' });
    }
  })
);

encomendaRouter.get(
  '/encomendas/:grupo_id',
  asyncHandler(async (req, res) => {
    const encomendas = await Encomendas.find({
      grupo_id: req.params.grupo_id,
    });

    if (encomendas) {
      res.send(encomendas);
    } else {
      res.status(404).send({ message: 'Erro ao buscar as Imagens' });
    }
  })
);

encomendaRouter.post(
  '/criarencomenda',
  asyncHandler(async (req, res) => {
    const encomenda = await Encomendas.create({
      enco_namepro: req.body.enco_namepro,
      enco_nameapl: req.body.enco_nameapl,
      enco_email: req.body.enco_email,
      enco_telemovel: req.body.enco_telemovel,
      enco_morada: req.body.enco_morada,
      enco_pais: req.body.enco_pais,
      enco_postal: req.body.enco_postal,
      enco_cidade: req.body.enco_cidade,
      enco_nif: req.body.enco_nif,
      enco_info: req.body.enco_info,
      enco_preco: req.body.enco_preco,
      enco_pagamanto: req.body.enco_pagamanto,
      enco_metodo: req.body.enco_metodo,
      enco_estado: req.body.enco_estado,
      enco_fechada: req.body.enco_fechada,
      enco_metodoP: req.body.enco_metodoP,
      enco_metodoEt: req.body.enco_metodoEt,
      enco_metodoEp: req.body.enco_metodoEp,
      grupo_id: req.body.grupo_id,
      enco_num: req.body.enco_num,
    });

    if (encomenda) {
      res.send(encomenda);
    } else {
      res.status(404).send({ message: 'Não tem Imagens da Encomenda Criada' });
    }
  })
);

encomendaRouter.post(
  '/criarimagens',
  asyncHandler(async (req, res) => {
    const imagens = await ImagensEncomendada.create({
      enco_id: req.body.enco_id,
      imagenc_id: req.body.imagenc_id,
    });

    if (imagens) {
      res.send('Imagens da Encomenda Criada');
    } else {
      res.status(404).send({ message: 'Não tem Imagens da Encomenda Criada' });
    }
  })
);

encomendaRouter.post('/create-payment-intent', async (req, res) => {
  console.log('popopopoposs');
  console.log(req.body.total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.total * 100,
    payment_method_types: [req.body.payment_method_types],
    currency: 'eur',
  });
  console.log(paymentIntent.client_secret);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

export default encomendaRouter;
