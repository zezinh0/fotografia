import express from 'express';
import User from '../models/modelUser.js';
import clientes from '../data2.js';
import Grupo from '../models/modelGrupo.js';
import Imagens from '../models/modelImagens.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Grupo.remove({});
  const createdGrupo = await Grupo.insertMany(clientes.grupos);
  res.send({ createdGrupo });
});

seedRouter.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const files = req.files.file;

  if (files.length > 1) {
    files.forEach(async (file, i) => {
      try {
        let caminho = `C:/Users/José Costa/Documents/gallery/frontend/public/images2/${file.name}`;
        file.mv(caminho);

        await Imagens.create({
          imag_caminho: caminho,
          imag_name: file.name,
          imag_medidas: req.body.tamanho,
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
        imag_medidas: req.body.tamanho,
        grupo_id: req.body.grupo,
      });
      console.log('Ok');
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  res.json('Upload Tooal');
});
export default seedRouter;

/*await User.remove({});
  const createdUser = await User.insertMany(clientes.users);
  res.send({ createdUser }); 
  -------------------------------------------
  await Grupo.remove({});
  const createdGrupo = await Grupo.insertMany(clientes.grupos);
  res.send({ createdGrupo });
  
  */
