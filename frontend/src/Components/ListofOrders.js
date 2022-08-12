import React from 'react';
import { Link } from 'react-router-dom';

export default function ListofOrders(props) {
  const encomendas = props.encomendass;
  console.log(encomendas);
  console.log(encomendas);
  {
    /*
    <Link
                              to={`/eachorder/${encom._id}`}
                              className="text-blue-500 hover:text-blue-900"
                            >
                              Ver Pedido
                            </Link>
*/
  }
  return (
    <div>
      {encomendas.length > 0 ? (
        <div className="py-5 flex flex-col">
          {encomendas[0].map((encomenda, idx) => (
            <div key={idx} className="py-5 flex flex-col">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-1xl font-semibold text-gray-900">
                  Código do Evento: {encomenda.grupo_codigo}
                </h1>
              </div>
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-10 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Número da Encomenda
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
                            Data da Encomenda
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total da Encomenda{' '}
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Método da Encomenda
                          </th>
                          <th scope="col" className="relative px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {encomenda.enco.length > 0 ? (
                          encomenda.enco.map((elemento, i) => (
                            <tr
                              key={i}
                              className={
                                i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                              }
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {elemento.enco_num}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {encomenda.grupo_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {elemento.createdAt.slice(0, 10)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {elemento.enco_preco} €
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {elemento.enco_metodoEt}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                  to={`/eachorder/${elemento._id}`}
                                  className="text-blue-500 hover:text-blue-900"
                                >
                                  Edit
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr
                            className={2 % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                              Sem Encomendas
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                        Número da Encomenda
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <p
                      className={
                        'bg-white px-6 py-2 whitespace-nowrap  text-red-500 '
                      }
                    >
                      Sem Ecomendas
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
