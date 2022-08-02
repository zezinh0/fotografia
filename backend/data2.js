import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import User from './models/modelUser.js';
const clientes = {
  users: [
    {
      user_email: 'client1@gmail.com',
      user_tag: '@client1',
      user_password: bcrypt.hashSync('12345'),
      user_name: 'Client1',
    },
  ],
  grupos: [
    {
      user_id: '62ddf3fd1c19bc83e0778fbe',
      grupo_name: 'Evento1',
      grupo_codigo: uuidv4(),
      grupo_privado: 'true',
    },
    {
      user_id: '62ddf3fd1c19bc83e0778fbe',
      grupo_name: 'Evento2',
      grupo_codigo: uuidv4(),
      grupo_privado: 'true',
    },
  ],
};

export default clientes;
