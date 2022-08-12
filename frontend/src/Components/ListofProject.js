import React, { useEffect, useReducer, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { clientes } from '../data2';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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

export default function ListofProject(props) {
  const eventos = props.eventos;

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });

  const deletegrupo = (id) => {
    const fetchData2 = async () => {
      console.log('U1');
      dispatch({ type: 'FETCH_REQUEST' });
      console.log('U2');
      console.log(id);
      try {
        console.log('U3');
        const result = await axios.delete(`/api/imagens/deleteimagens/${id}`);
        console.log('U4');
        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    const fetchData = async () => {
      console.log('U1');
      dispatch({ type: 'FETCH_REQUEST' });
      console.log('U2');
      console.log(id);
      try {
        console.log('U3');
        const result = await axios.delete(`/api/grupos/deletegrupo/${id}`);
        console.log('U4');
        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS' });
        window.location.reload(false);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData2(id);
    fetchData(id);
  };
  return (
    <div>
      {eventos.length > 0 ? (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Código para Partilhar
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Nome do Evento
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data da Criação do Projeto
                      </th>

                      <th scope="col" className="relative px-6 py-3"></th>

                      <th scope="col" className="relative px-6 py-3"></th>
                      <th scope="col" className="relative px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventos.map((evento, personIdx) => (
                      <tr
                        key={evento._id}
                        className={
                          personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {evento.grupo_codigo.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {evento.grupo_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {evento.createdAt.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => deletegrupo(evento._id)}
                          >
                            Remove
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/editgrupo/${evento._id}`}
                            className="text-blue-500 hover:text-blue-900"
                          >
                            Edit
                          </Link>
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
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Código para Partilhar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <p
                      className={
                        'bg-white px-6 py-2 whitespace-nowrap  text-red-500 '
                      }
                    >
                      Sem Eventos
                    </p>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
