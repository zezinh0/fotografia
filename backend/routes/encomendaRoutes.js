import express, { application } from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
import ImagensEncomendada from '../models/modelImagensEcomendada.js';
import Imagens from '../models/modelImagens.js';
import Stripe from 'stripe';
import Encomendas from '../models/modelEncomendas.js';
import moment from 'moment';
const encomendaRouter = express.Router();
const stripe = new Stripe(
  
);
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(
  
);
encomendaRouter.get(
  '/imagens/:enco_id',
  asyncHandler(async (req, res) => {
    const imagensEcomendada = await ImagensEncomendada.find({
      enco_id: req.params.enco_id,
    });

    if (imagensEcomendada) {
      let send = [];
      let flag = true;
      for (const element of imagensEcomendada) {
        const image = await Imagens.find({
          _id: element.esc_id_image,
        });
        console.log('PARA AQUI');
        console.log(image[0]);
        const grupo = await Grupo.find({
          _id: image[0].grupo_id,
        });
        console.log('PARA AQUI22222');
        console.log(grupo[0]);

        if (element.esc_id_tamanho === grupo[0].grupo_download_id) {
          send.push({
            quantity: element.quantity,
            imag_caminho: image[0].imag_caminho,
            imag_name: image[0].imag_name,
            imag_id: image[0].imag_id,
            imag_largura: '',
            imag_altura: '',
            imag_price: grupo[0].grupo_download_price,
            imag_download: true,
          });
        } else {
          for (const element2 of grupo[0].grupo_medidas) {
            if (element2.id === element.esc_id_tamanho) {
              send.push({
                quantity: element.quantity,
                imag_caminho: image[0].imag_caminho,
                imag_name: image[0].imag_name,
                imag_id: image[0].imag_id,
                imag_largura: element2.largura,
                imag_altura: element2.altura,
                imag_price: element2.price,
                imag_download: false,
              });
            }
            flag = false;
          }
        }
      }
      res
        .status(200)
        .send({ data: send, flag: flag, message: 'Fetch with Succefull' });
    } else {
      res.status(404).send({ message: 'Erro ao buscar as Imagens' });
    }
  })
);

encomendaRouter.get(
  '/getencomenda/:id',
  asyncHandler(async (req, res) => {
    const encomenda = await Encomendas.find({
      _id: req.params.id,
    });

    if (encomenda) {
      res
        .status(200)
        .send({ data: encomenda, message: 'Fetch with Succefull' });
    } else {
      res.status(404).send({ message: 'Erro ao buscar a encomenda' });
    }
  })
);

encomendaRouter.get(
  '/encomendas/:user_id',
  asyncHandler(async (req, res) => {
    let count = req.query.page * req.query.limit;
    let total = await Encomendas.find({ user_id: req.params.user_id }).count();
    const encomendas = await Encomendas.find({
      user_id: req.params.user_id,
    })
      .skip(count)
      .limit(req.query.limit);
    const send = { total: total, encomendas: encomendas };
    if (send) {
      res
        .status(200)
        .send({ data: send, message: 'Fetch Orders Successfully' });
    } else {
      res.status(404).send({ message: 'Error to Fetch Orders' });
    }
  })
);

encomendaRouter.post(
  '/criarencomenda',
  asyncHandler(async (req, res) => {
    console.log('AQUIIIIII');
    let information = JSON.parse(req.body.information);
    information.enco_pagamanto = 1;
    information.enco_fechada = 0;
    information.enco_metodoP = 1;
    information.enco_num = 25;
    information.enco_processada = '';
    information.enco_enviada = '';
    information.enco_entregue = '';
    //console.log(information);
    //let images = JSON.parse(req.body.images);
    //console.log(images);
    try {
      const encomenda = await Encomendas.create(information);
      //let data = encomenda;
      //console.log(encomenda._id.toString());
      const msg = {
        to: 'josemanuel19982425@gmail.com', // Change to your recipient
        from: 'ze_manuel_costa1998@hotmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.jsssss</strong>',
      };
      sgMail
        .send(msg)
        .then((response) => {
          console.log(response[0].statusCode);
          console.log(response[0].headers);
        })
        .catch((error) => {
          console.error(error);
        });
      res
        .status(200)
        .send({ data: encomenda, message: 'Order Created Successfully' });
    } catch (error) {
      res.status(404).send({ message: 'Error in Order' });
    }
  })
);

encomendaRouter.post(
  '/criarimagens',
  asyncHandler(async (req, res) => {
    console.log('AQUIIIIII222222222');
    console.log('AQUIIIIII222222222');
    let images = JSON.parse(req.body.images);
    console.log(images);
    try {
      for (const element of images.imagenc_id) {
        const enc_images = await ImagensEncomendada.create({
          esc_id_image: element.esc_id_image,
          esc_id_tamanho: element.esc_id_tamanho,
          quantity: element.quantity,

          enco_id: images.enco_id,
        });
      }

      res.status(200).send({ message: 'Images Created Successfully' });
    } catch (error) {
      res.status(404).send({ message: 'Error in Ordered Images' });
    }
  })
);

encomendaRouter.put(
  '/update_state',
  asyncHandler(async (req, res) => {
    console.log('AQUI CARAGO');
    console.log(req.body);
    if (req.body.num === '2') {
      var now = new Date();
      const grupo = await Encomendas.updateOne(
        { _id: req.body.id },
        {
          enco_estado: req.body.num,
          enco_processada: moment(now).format('YYYY-MM-DD HH:mm:ss'),
        }
      );
      console.log(grupo);
      if (grupo) {
        res.status(200).send({ message: 'Tudo ok' });
      } else {
        res.status(404).send({ message: 'Não tem Grupo Criado' });
      }
    }
    if (req.body.num === '3') {
      var now = new Date();
      const grupo = await Encomendas.updateOne(
        { _id: req.body.id },
        {
          enco_estado: req.body.num,
          enco_enviada: moment(now).format('YYYY-MM-DD HH:mm:ss'),
        }
      );
      console.log(grupo);
      if (grupo) {
        res.status(200).send({ message: 'Tudo ok' });
      } else {
        res.status(404).send({ message: 'Não tem Grupo Criado' });
      }
    }
  })
);

encomendaRouter.post('/create-payment-intent', async (req, res) => {
  console.log('popopopoposs');
  let num = parseFloat(req.body.information);
  console.log(num);
  num = (num * 10).toFixed(2);
  console.log(num);
  num = parseInt(num * 10);
  console.log(num);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'EUR',
      amount: num,

      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
const endpointSecret =
  ;
encomendaRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let data, eventType;
    let event = request.body;
    //console.log('tutututututut');
    //console.log(event);
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }

      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // we can retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('💰 Payment captured!');
        console.log('3333333333333333333333333333333333333333');
        // Then define and call a method to handle the successful payment intent.
        //handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log('💰 Payment captured!');
        console.log('44444444444444444444444444444444444444444444444');
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        //handlePaymentMethodAttached(paymentMethod);
        break;
      case 'payment_intent.payment_failed':
        console.log('❌ Payment failed.');
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        //handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log('saoidjoisajod');
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
  }
);

export default encomendaRouter;
