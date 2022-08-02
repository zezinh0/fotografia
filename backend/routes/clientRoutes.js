import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import Imagens from '../models/modelImagens.js';
import asyncHandler from 'express-async-handler';

const clientRouter = express.Router();

clientRouter.get(
  '/:grupo_codigo',
  asyncHandler(async (req, res) => {
    const grupoo = await Grupo.findOne({
      grupo_codigo: req.params.grupo_codigo,
    });

    if (grupoo) {
      res.send(grupoo);
    } else {
      res.status(404).send({ message: 'Esse Grupo não existe' });
    }
  })
);

export default clientRouter;
