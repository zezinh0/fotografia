import React, { useEffect, useState, Fragment, useReducer } from 'react';
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { clientes } from '../data2';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/solid';
import { PaperClipIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import { v4 as uuidv4 } from 'uuid';
import { Switch } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderPho from './HeaderPho';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { loading: true };
    case 'FETCH_SUCCESS':
      return { loading: false };
    case 'FETCH_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CreateProject() {
  const user_id = '62ddf3fd1c19bc83e0778fbe';
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  const navigate = useNavigate();
  const [files, setFile] = useState([]);

  const [images, setImagens] = useState([]);
  const [open, setOpen] = useState(false);
  const [grupo_name, setGrupo_Name] = useState('');
  const [tamanhos, setTamanho] = useState([]);
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [preço, setPreço] = useState('');
  const codigo = uuidv4();
  const [enabled, setEnabled] = useState(false);

  const handleFile = (e) => {
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFile((prevfiles) => [...prevfiles, file[i]]);
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const removeTamanho = (i) => {
    setTamanho(tamanhos.filter((x) => x.id !== i));
  };

  const onSubmit = async () => {
    console.log('Entrei');
    //dispatch({ type: 'FETCH_REQUEST' });
    console.log('FETCH_REQUEST');
    var grupo = new FormData();

    grupo.append('nome', grupo_name);
    let tam = '';
    tamanhos.forEach((tamanho) => {
      tam =
        tam +
        tamanho.l +
        '-' +
        tamanho.a +
        '-' +
        tamanho.p +
        '-' +
        tamanho.id +
        ',';
    });
    grupo.append('tamanho', tam);
    grupo.append('codigo', codigo);
    grupo.append('enabled', true);

    try {
      const res = await axios.post(`/api/grupos/create/${user_id}`, grupo);

      if (files.length > 0) {
        files.forEach(async (file) => {
          var formData = new FormData();
          formData.append('grupo', res.data._id);
          formData.append('file', file);
          await axios.post('/api/imagens/upload', formData);
        });
      }

      // Clear percentage
      console.log('File Uploaded');
      console.log('FETCH_SUCCESS');
    } catch (error) {
      console.log('FETCH_FAIL');
      //dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
    navigate('/project');
  };

  const Tamanhos = () => {
    const tam = {
      l: largura,
      a: altura,
      p: preço,
      id: Date.now(),
    };

    setTamanho((prevfiles) => [...prevfiles, tam]);
    setLargura('');
    setAltura('');
    setPreço('');
    setOpen(false);
  };

  const Apagar = () => {
    setLargura('');
    setAltura('');
    setPreço('');
    setOpen(false);
  };

  const cancel = () => {
    navigate('/project');
  };

  return (
    <div className="min-h-full">
      <HeaderPho />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl tracking-tight font-bold text-gray-600">
            <Link to={`/project`} className="text-gray-600 hover:text-black">
              Grupo
            </Link>
            {' > Criar Grupo'}
          </h2>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="px-3 space-y-8 divide-y divide-gray-200">
              <div>
                {/**
               * <div>
                  <h3 className=" text-xl leading-6 font-medium text-gray-900">
                    Criar um Grupo
                  </h3>
                </div>
               * 
               */}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="username"
                      className="block text-md font-medium text-gray-900"
                    >
                      Código do Grupo
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <h3 className=" text-ld leading-6 font-medium text-blue-900">
                        {codigo.toUpperCase()}
                      </h3>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="username"
                      className="block text-md font-medium text-gray-900"
                    >
                      Nome do Grupo
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        value={grupo_name}
                        onChange={(e) => setGrupo_Name(e.target.value)}
                        className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      />
                    </div>
                  </div>
                  {/* ´
            <div className="sm:col-span-6">
              <label
                htmlFor="username"
                className="block text-md font-medium text-gray-900"
              >
                Grupo Privado
              </label>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? 'bg-indigo-600' : 'bg-gray-200',
                  'mt-1 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                >
                  <span
                    className={classNames(
                      enabled
                        ? 'opacity-0 ease-out duration-100'
                        : 'opacity-100 ease-in duration-200',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    className={classNames(
                      enabled
                        ? 'opacity-100 ease-in duration-200'
                        : 'opacity-0 ease-out duration-100',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                    </svg>
                  </span>
                </span>
              </Switch>
            </div>
            */}

                  <div className="sm:col-span-6">
                    <h3 className="text-md leading-6 font-medium text-gray-900">
                      Tamanho das Imagens
                    </h3>
                  </div>

                  <div className="sm:col-span-1">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Novo Tamanho
                    </button>
                  </div>

                  <Transition.Root show={open} as={Fragment}>
                    <Dialog
                      as="div"
                      className="fixed z-10 inset-0 overflow-y-auto"
                      onClose={setOpen}
                    >
                      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                          className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true"
                        >
                          &#8203;
                        </span>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                              <button
                                type="button"
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => Apagar()}
                              >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                              <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg leading-6 font-medium text-gray-900"
                                >
                                  Tamanho da Imagem
                                </Dialog.Title>
                              </div>
                            </div>
                            <div className=" mt-3">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Largura da Imagem (cm)
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="largura"
                                  id="largura"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="10"
                                  value={largura}
                                  onChange={(e) => setLargura(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1 mt-3">
                              <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Altura da Imagem (cm)
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="altura"
                                  id="altura"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="10"
                                  value={altura}
                                  onChange={(e) => setAltura(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-1 mt-3">
                              <label
                                htmlFor="zip"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Preço da Imagem
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">
                                    €
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="preço"
                                  id="preço"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                  value={preço}
                                  onChange={(e) => setPreço(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => Tamanhos()}
                              >
                                Adicionar
                              </button>
                              <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                onClick={() => Apagar()}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition.Root>

                  {tamanhos.length > 0 ? (
                    <div className="flex flex-col sm:col-span-6">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Largura da Imagem (cm)
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Altura da Imagem (cm)
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                  >
                                    Preço por Imagem (€)
                                  </th>

                                  <th
                                    scope="col"
                                    className="relative px-6 py-3"
                                  >
                                    <span className="sr-only">Edit</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {tamanhos.map((tamanho, personIdx) => (
                                  <tr
                                    key={tamanho.id}
                                    className={
                                      personIdx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                    }
                                  >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {tamanho.l} cm
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {tamanho.a} cm
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {tamanho.p} €
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button
                                        href="#"
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => {
                                          removeTamanho(tamanho.id);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="cover-photo"
                      className="block text-md font-medium text-gray-900"
                    >
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFile}
                              multiple
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  role="list"
                  className="py-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-4 lg:grid-cols-8 xl:gap-x-8"
                >
                  {files.map((file, key) => (
                    <li key={file.name} className="relative">
                      <div className="group block w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="object-cover pointer-events-none group-hover:opacity-30"
                        />
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                          <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                            onClick={() => {
                              removeImage(file.name);
                            }}
                          >
                            <span className="sr-only">Close sidebar</span>
                            <XIcon
                              className="h-6 w-6 text-black"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => cancel()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => onSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
