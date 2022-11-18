import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import asyncHandler from 'express-async-handler';
import Imagens from '../models/modelImagens.js';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import crypto from 'crypto';

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
      console.log('111111111111111');
      console.log(grupo[0]);
      console.log('222222222222222');
      console.log(grupo[0].grupo_medidas);
      let enviar = [];
      imagens.map((element) => {
        //console.log('P1');
        console.log(element);

        enviar.push({
          ...element._doc,
          imag_medidas: grupo[0].grupo_medidas,
          grupo_download: grupo[0].grupo_download,
          grupo_download_price: grupo[0].grupo_download_price,
          grupo_download_id: grupo[0].grupo_download_id,
        });
      });

      console.log(enviar);
      res.send(enviar);
    } else {
      res.status(404).send({ message: 'Esse Grupo não existe' });
    }
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/José Costa/Documents/gallery/frontend/public/images2/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.createHmac('sha256', uuidv4()).digest('hex');
    cb(null, uniqueSuffix);
  },
});

const multi_upload = multer({
  storage,
}).array('uploadImages', 3);

imagensRouter.post('/upload', (req, res) => {
  console.log('opopopopopopopopopo');

  multi_upload(req, res, async function (err) {
    for (const element of req.files) {
      {
        console.log('YYYYYYYYYYYYY');
        console.log(element);
        await Imagens.create({
          imag_caminho: element.destination + element.filename,
          imag_name: element.originalname,
          grupo_id: req.body.grupo,
          imag_id: element.filename,
        });
      }
    }
    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == 'ExtensionError') {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.status(200).send('file uploaded');
  });
});
{
  /*
imagensRouter.post('/upload', async (req, res) => {
  multi_upload(req, res, function (err) {
    console.log('FICHEIROS');
    console.log(req.files);
    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == 'ExtensionError') {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.status(200).send('file uploaded');
  });

  
    try {
      let imag_id = uuidv4();
      let caminho = `C:/Users/José Costa/Documents/gallery/frontend/public/images2/${imag_id}`;
      await Imagens.create({
        imag_caminho: caminho,
        imag_name: files.name,
        grupo_id: req.body.grupo,
        imag_id: imag_id,
      });
      files.mv(caminho);
    } catch (err) {
      return res.status(500).send(err);
    }
    

  console.log('Ok');
});
*/
}

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
