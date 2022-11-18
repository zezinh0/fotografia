import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircleIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { Store } from '../Store';
import Header2 from './Header2';

export default function Code() {
  const [codigo, setCodigo] = useState('');
  const [open, setOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const entrar = () => {
    const fetchData = async (codigo) => {
      //dispatch({ type: 'FETCH_REQUEST' });
      try {
        console.log(codigo);
        const result = await axios.get(`/api/client/${codigo}`);
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result);

        ctxDispatch({
          type: 'GUPO_ADD',
          payload: result.data,
        });

        navigate('/imagelist');
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });
        console.log(error);
        alert(error.response.data.message);
      }
    };
    fetchData(codigo);
  };
  return (
    <div>
      <Header2></Header2>
      <div className="min-h-full flex  justify-center py-48 items-center">
        <div className="max-w-md w-full space-y-8 justify-center items-center ">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Código de Entrada
            </h2>
            {open === true ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      Código Errado
                    </p>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                      <button
                        type="button"
                        className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-red-600"
                      >
                        <span className="sr-only">Dismiss</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/*<p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>*/}
          </div>
          <div className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="Código" className="sr-only">
                  Código
                </label>
                <input
                  id="codigo"
                  name="codigo"
                  type="codigo"
                  autoComplete="codigo"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Código"
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
              {/*<div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>*/}
            </div>

            <div className="flex items-center justify-between">
              {/*<div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>*/}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => entrar()}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
