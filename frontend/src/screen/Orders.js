import React, { useEffect, useState } from 'react';
import { clientes } from '../data2';
import { Link } from 'react-router-dom';

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

export default function Orders() {
  const usertag = '@client1';
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    console.log('bbbbbbbbbbb');
    const client = clientes.users.find((user) => user.usertag === usertag);
    setEventos(client.eventos);
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Pedidos</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
                        Data de Envio
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
                        Status
                      </th>

                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, personIdx) => (
                      <tr
                        key={order.number}
                        className={
                          personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href="#"
                            className="text-blue-500 hover:text-blue-900"
                          >
                            {order.number}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.datao}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          -/-/-
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $60
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {'send' === 'send' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-red-800">
                              Enviar
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                              Enviado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/eachorder/${order.number}`}
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
    </div>
  );
}
