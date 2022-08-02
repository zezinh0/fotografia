import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
import Imagens from '../models/modelImagens.js';
import fs from 'fs';
const imagensRouter = express.Router();

imagensRouter.get(
  '/imagens/:grupo_id',
  asyncHandler(async (req, res) => {
    const imagens = await Imagens.find({ grupo_id: req.params.grupo_id });

    if (imagens) {
      res.send(imagens);
    } else {
      res.status(404).send({ message: 'Esse Grupo não existe' });
    }
  })
);

imagensRouter.get(
  '/imagens2/:grupo_id',
  asyncHandler(async (req, res) => {
    const imagens = await Imagens.find({ grupo_id: req.params.grupo_id });

    if (imagens) {
      const grupo = await Grupo.find({ _id: req.params.grupo_id });
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
      console.log(array);
      let enviar = [];
      imagens.map((element) => {
        //console.log('P1');
        //console.log(element);
        enviar.push({ ...element._doc, imag_medidas: array });
      });

      console.log(enviar);
      res.send(enviar);
    } else {
      res.status(404).send({ message: 'Esse Grupo não existe' });
    }
  })
);

imagensRouter.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const files = req.files.file;

  if (files.length > 1) {
    files.forEach(async (file, i) => {
      try {
        console.log(i);
        console.log(file);
        let caminho = `C:/Users/José Costa/Documents/gallery/frontend/public/images2/${file.name}`;
        file.mv(caminho);

        await Imagens.create({
          imag_caminho: caminho,
          imag_name: file.name,
          grupo_id: req.body.grupo,
        });

        console.log('Ok');
      } catch (err) {
        return res.status(500).send(err);
      }
    });
  } else {
    try {
      let caminho = `C:/Users/José Costa/Documents/gallery/frontend/public/images2/${files.name}`;
      files.mv(
        `C:/Users/José Costa/Documents/gallery/frontend/public/images2/${files.name}`
      );
      await Imagens.create({
        imag_caminho: caminho,
        imag_name: files.name,
        grupo_id: req.body.grupo,
      });
      console.log('Ok');
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  res.json('Upload Tooal');
});

imagensRouter.delete(
  '/deleteimagensid/:_id',
  asyncHandler(async (req, res) => {
    console.log('Y1');
    console.log(req.params._id);
    const data = await Imagens.find({
      _id: req.params._id,
    });

    try {
      fs.unlinkSync(data[0].imag_caminho);
      //file removed
    } catch (err) {
      console.error(err);
    }

    console.log(data);
    console.log('Y2');
    const resp = await Imagens.deleteMany({
      _id: req.params._id,
    });
    if (resp) {
      console.log('Y3');
      res.send(resp + '- A Imagem foi Eliminada');
    } else {
      res.status(404).send({ message: 'O Imagem não foi eliminada' });
    }
  })
);

imagensRouter.delete(
  '/deleteimagens/:_id',
  asyncHandler(async (req, res) => {
    console.log('Y1');
    console.log(req.params._id);
    const data = await Imagens.find({
      grupo_id: req.params._id,
    });
    data.forEach((image) => {
      try {
        fs.unlinkSync(image.imag_caminho);
        //file removed
      } catch (err) {
        console.error(err);
      }
    });
    console.log(data);
    console.log('Y2');
    const resp = await Imagens.deleteMany({
      grupo_id: req.params._id,
    });
    if (resp) {
      console.log('Y3');
      res.send(resp + '- As Imagens foram Eliminadas');
    } else {
      res.status(404).send({ message: 'O Imagens não foram eliminadas' });
    }
  })
);

export default imagensRouter;
