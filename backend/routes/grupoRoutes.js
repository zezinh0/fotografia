import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
const gruposRouter = express.Router();

gruposRouter.get(
  '/:user_id',
  asyncHandler(async (req, res) => {
    let count = req.query.page * req.query.limit;
    let total = await Grupo.find({ user_id: req.params.user_id }).count();
    const grupos = await Grupo.find({ user_id: req.params.user_id })
      .skip(count)
      .limit(req.query.limit);

    const send = { total: total, grupos: grupos };
    if (send) {
      res.send(send);
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
      res.status(200).send({ data: grupo, message: 'Group Exist' });
    } else {
      res.status(404).send({ message: 'Group Not Exist' });
    }
  })
);

gruposRouter.get(
  '/grupo/discount/:id',
  asyncHandler(async (req, res) => {
    console.log('UUUUII TUDO OK');
    const grupo = await Grupo.find({ _id: req.params.id });

    const existItem = grupo[0].grupo_discount.find(
      (item) => item.name === req.query.discount
    );

    console.log(req.query.discount);
    console.log(existItem);
    if (existItem) {
      res.status(200).send({ data: existItem, message: 'Group Exist' });
    } else {
      res.status(404).send({ message: 'Group Not Exist' });
    }
  })
);
gruposRouter.get(
  '/grupo/delivery/:id',
  asyncHandler(async (req, res) => {
    console.log('UUUUII TUDO OK');
    const delivery = await Grupo.find({ _id: req.params.id });

    if (delivery) {
      res
        .status(200)
        .send({ data: delivery[0].grupo_delivery, message: 'Delivery Exist' });
    } else {
      res.status(404).send({ message: 'Delivery Not Exist' });
    }
  })
);

gruposRouter.post(
  '/create/:user_id',
  asyncHandler(async (req, res) => {
    console.log(req.body);
    const neww = JSON.parse(req.body.send);

    const grupo = await Grupo.create(neww);

    if (grupo) {
      res.status(200).send({ data: grupo, message: 'Group Created' });
    } else {
      res.status(404).send({ message: 'Group Not Created' });
    }
  })
);

gruposRouter.put(
  '/update/:_id',
  asyncHandler(async (req, res) => {
    const neww = JSON.parse(req.body.send);

    const grupo = await Grupo.updateOne({ _id: req.params._id }, neww);

    if (grupo) {
      res.status(200).send({ data: grupo, message: 'Group Changed' });
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
