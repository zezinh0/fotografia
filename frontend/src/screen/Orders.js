import React, { useEffect, useReducer, useState } from 'react';
import { clientes } from '../data2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const orders = [
  {
    number: '99',
    status: 'Delivered on January 22, 2021',
    datao: '17/7/2022',
    datas: '-/-/-',
    status: 'send',
    total: 40,
    products: [
      {
        id: 1,
        name: 'Machined Brass Puzzle',
        href: '#',
        price: '$95.00',
        color: 'Brass',
        size: '3" x 3" x 3"',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-07-product-01.jpg',
        imageAlt:
          'Brass puzzle in the shape of a jack with overlapping rounded posts.',
      },
      // More products...
    ],
  },

  // More orders...
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, encomendas: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function Orders() {
  const user_id = '62ddf3fd1c19bc83e0778fbe';
  const [{ loading, error, encomendas }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    encomendas: [],
  });

  console.log('ioioioiyudashjdg');
  console.log(encomendas);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/grupos/${user_id}`);
        console.log('ppoppopopo');
        console.log(result);
        let array = [];
        result.data.map(async (grupo) => {
          const result2 = await axios.get(
            `/api/encomenda/encomendas/${grupo._id}`
          );
          if (result2.data.length > 0) {
            let arr = [];
            result2.data.map((resul) => {
              arr.push(resul);
            });
            array.push({
              grupo_codigo: grupo.grupo_codigo,
              enco: arr,
            });
          }
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: array });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl font-semibold text-gray-900">Pedidos</h1>
      </div>
      {encomendas.map((encomenda, personIdx) => (
        <div key={personIdx} className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Código do Projeto: {encomenda.grupo_codigo}
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-10 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Número do Pedido
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Data do Pedido
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Método Escolhido
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>

                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {encomenda.enco.map((encom, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a
                              href="#"
                              className="text-blue-500 hover:text-blue-900"
                            >
                              {encom.enco_num}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {encom.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {encom.enco_preco}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {encom.enco_metodoEt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {'Enviar'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/eachorder/${encom._id}`}
                              className="text-blue-500 hover:text-blue-900"
                            >
                              Ver Pedido
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
        </div>
      ))}
    </div>
  );
}
