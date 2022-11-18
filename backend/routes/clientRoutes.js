import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import Imagens from '../models/modelImagens.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const clientRouter = express.Router();

clientRouter.get(
  '/:grupo_codigo',
  asyncHandler(async (req, res) => {
    const grupoo = await Grupo.findOne({
      grupo_codigo: req.params.grupo_codigo,
    });
    const user = await User.findOne({
      _id: grupoo.user_id,
    });
    console.log('AQUI');
    console.log(grupoo);
    console.log(user);
    if (grupoo && user) {
      res.send({
        grupo_id: grupoo._id,
        user_email: user.user_email,
        user_id: user._id,
      });
    } else {
      res.status(404).send({ message: 'Esse Grupo não existe' });
    }
  })
);

clientRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    console.log('Chegei');
    console.log('Chegei');
    console.log('Chegei');
    const client = await User.findOne({
      user_email: req.body.email,
    });

    if (!client) res.status(404).send({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      client.user_password
    );
    if (!validPassword)
      res.status(404).send({ message: 'Invalid credentials' });

    console.log(client);

    const refreshToken = jwt.sign(
      {
        user_id: client._id,
        user_email: client.user_email,
        user_name: client.user_name,
      },
      'refresh_secret',
      { expiresIn: '1m' }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 60 * 1000, //7 days -->24 * 60 * 60 * 1000
    });
    const acessToken = jwt.sign(
      {
        user_id: client._id,
        user_email: client.user_email,
        user_name: client.user_name,
      },
      'access_secret',
      { expiresIn: '30s' }
    );

    res.status(200).send({ acessToken });
  })
);

clientRouter.post(
  '/register',
  asyncHandler(async (req, res) => {
    const client = await User.findOne({
      user_email: req.body.email,
    });
    if (client) res.status(404).send({ message: 'This Email Already Exists' });
    const user = await User.create({
      user_email: req.body.email,
      user_password: bcrypt.hashSync(req.body.password),
      user_name: req.body.name,
      token: [],
    });

    if (user) {
      res.status(200).send({ message: 'Sucess Registered' });
    } else {
      res.status(404).send({ message: 'Error when Registering' });
    }
  })
);

export default clientRouter;
