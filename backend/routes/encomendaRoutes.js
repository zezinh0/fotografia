import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
import ImagensEncomendada from '../models/modelImagensEcomendada.js';
import Imagens from '../models/modelImagens.js';
const encomendaRouter = express.Router();

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

export default encomendaRouter;
