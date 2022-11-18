import React, { useEffect, useReducer, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { clientes } from '../data2';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid';
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline';

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
  //Código para Partilhar    	Nome do Evento	    Data da Criação do Projeto
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Code to Share
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Event Name
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Date
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Remove</span>
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {eventos.map((evento) => (
          <tr key={evento._id}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-blue-500 sm:w-auto sm:max-w-none sm:pl-6">
              {evento.grupo_codigo.toUpperCase()}
              <dl className="font-normal lg:hidden">
                <dt className="sr-only">Event Name</dt>
                <dd className="mt-1 truncate text-gray-700">
                  {evento.grupo_name}
                </dd>
                <dt className="sr-only sm:hidden">Date</dt>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                  <time> {evento.createdAt.slice(0, 10)}</time>
                </dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {evento.grupo_name}
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              <time> {evento.createdAt.slice(0, 10)}</time>
            </td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <a href="#" className="text-red-600 hover:text-red-900">
                Remove
                <span className="sr-only">, {evento.grupo_name}</span>
              </a>
            </td>
            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <Link
                to={`/editgrupo/${evento._id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
                <span className="sr-only">,{evento.grupo_name}</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
