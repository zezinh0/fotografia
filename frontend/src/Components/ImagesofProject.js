import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { clientes } from '../data2';

export default function ImagesofProject() {
  const usertag = '@client1';
  const codigo = '1';
  const [images, setImagens] = useState([]);

  useEffect(() => {
    console.log('bbbbbbbbbbb');
    const client = clientes.users.find((user) => user.usertag === usertag);
    console.log(client);
    if (client) {
      console.log('CCCCCCCCCCCCCC');
      const imagess = client.eventos.find((evento) => evento.codigo === codigo);
      console.log(imagess);
      setImagens(imagess.images);
    }
  }, []);

  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const handleFile = (e) => {
    setMessage('');
    console.log('AAAAAZZZZZZAAAAA');
    console.log(files);
    console.log('AAAAAAAAAA');
    console.log(e.target.files);
    let file = e.target.files;
    console.log('UUUUUUu');
    console.log(file);
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFile((prevfiles) => [...prevfiles, file[i]]);
      } else {
        setMessage('only images accepted');
      }
    }
    console.log('OOOOOOO');
    console.log(files);
  };
  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Código: 1</h1>
        <p className="py-2 text-2 font-semibold text-gray-900">Images</p>
      </div>
      <div className="text-center">
        <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
          {message}
        </span>
        <div class="flex justify-center items-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col justify-center items-center   bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              onChange={handleFile}
              multiple
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, key) => (
            <div key={key} className="  px-2 ">
              <img
                className="h-40 w-40 rounded-md"
                src={URL.createObjectURL(file)}
              />
              <a
                href="#"
                class="hover:text-primary-600 text-lg transition duration-500 font-medium"
                onClick={() => {
                  removeImage(file.name);
                }}
              ></a>
            </div>
          ))}
        </div>
      </div>
      {/*----------------------------List of Images-------------------*/}
      <div className="py-4 px-4">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-9 gap-y-6 sm:grid-cols-3 sm:gap-x-1 lg:grid-cols-6 xl:gap-x-1"
        >
          {images.map((file) => (
            <li key={file._id} className="relative">
              <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                <img
                  src={file.source}
                  alt=""
                  className="object-cover pointer-events-none group-hover:opacity-75"
                />
              </div>
              <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                {file.title}
              </p>
              <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                {file.size}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
