import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
const gruposRouter = express.Router();

gruposRouter.get(
  '/:user_id',
  asyncHandler(async (req, res) => {
    const grupos = await Grupo.find({ user_id: req.params.user_id });
    if (grupos) {
      res.send(grupos);
    } else {
      res.status(404).send({ message: 'Não tem Grupos Criados' });
    }
  })
);

gruposRouter.get(
  '/grupo/:id',
  asyncHandler(async (req, res) => {
    const grupo = await Grupo.find({ _id: req.params.id });
    if (grupo) {
      let array = [];
      let data = grupo[0].grupo_medidas.split(',');
      for (let i = 0; i < data.length - 1; i++) {
        array.push({
          largura: data[i].split('-')[0],
          altura: data[i].split('-')[1],
          price: data[i].split('-')[2],
          id: data[i].split('-')[3],
        });
      }
      let enviar = {
        _id: grupo[0]._id,
        createdAt: grupo[0].createdAt,
        grupo_codigo: grupo[0].grupo_codigo,
        grupo_medidas: array,
        grupo_name: grupo[0].grupo_name,
        grupo_privado: grupo[0].grupo_privado,
        updatedAt: grupo[0].updatedAt,
        user_id: grupo[0].user_id,
      };

      res.send(enviar);
    } else {
      res.status(404).send({ message: 'Não tem o Grupo' });
    }
  })
);

gruposRouter.post(
  '/create/:user_id',
  asyncHandler(async (req, res) => {
    const grupo = await Grupo.create({
      user_id: req.params.user_id,
      grupo_name: req.body.nome,
      grupo_codigo: req.body.codigo,
      grupo_privado: req.body.enabled,
      grupo_medidas: req.body.tamanho,
    });

    if (grupo) {
      res.send(grupo);
    } else {
      res.status(404).send({ message: 'Não tem Grupo Criado' });
    }
  })
);

gruposRouter.put(
  '/update/:_id',
  asyncHandler(async (req, res) => {
    console.log('okokokokokokok');
    const grupo = await Grupo.updateOne(
      { _id: req.params._id },
      {
        grupo_name: req.body.nome,
        grupo_privado: req.body.enabled,
        grupo_medidas: req.body.tamanho,
      }
    );

    if (grupo) {
      console.log(grupo);
      res.send(grupo.data + '- O Grupo foi Update');
    } else {
      res.status(404).send({ message: 'Não tem Grupo Criado' });
    }
  })
);

gruposRouter.delete(
  '/deletegrupo/:_id',
  asyncHandler(async (req, res) => {
    console.log('PP11111');
    console.log(req.params._id);
    const resp = await Grupo.deleteOne({
      _id: req.params._id,
    });
    console.log('PP22222');
    if (resp) {
      console.log('PP33333');
      res.send(resp + '- O Grupo foi eliminado');
    } else {
      res.status(404).send({ message: 'O Grupo não foi eliminado' });
    }
  })
);

export default gruposRouter;
