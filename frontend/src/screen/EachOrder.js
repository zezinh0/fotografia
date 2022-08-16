import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import OrderInfo from '../Components/OrderInfo';
const orders = [
  {
    number: 'WU88191111',
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    invoiceHref: '#',
    total: '$238.00',
    products: [
      {
        id: 1,
        name: 'Machined Pen and Pencil Set',
        href: '#',
        price: '$70.00',
        status: 'incompleted',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        imageAlt:
          'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
      },
      // More products...
    ],
  },
  // More orders...
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { loading: true };
    case 'FETCH_SUCCESS':
      return { encomenda: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function EachOrder() {
  console.log('popopopopopopo444444444444444444444444444');

  const params = useParams();
  const { idd } = params;
  const ipp = '62faadfb8237320e0f6e52e4';
  const [{ loading, error, encomenda }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    encomenda: [],
  });

  useEffect(() => {
    console.log('2222222222222222222222');
    const fetchData = async () => {
      console.log('2222222222222222222222');
      dispatch({ type: 'FETCH_REQUEST' });
      console.log('2222222222222222222222');
      try {
        const result = await axios.get(`/api/encomenda/getencomenda/${idd}`);

        console.log('2222222222222222222222');
        console.log(result);

        const result2 = await axios.get(`/api/encomenda/imagens/${idd}`);
        console.log('33333333333333333333');
        console.log(result2);
        let env = { encomenda: result.data[0], imagens: result2.data };
        dispatch({ type: 'FETCH_SUCCESS', payload: env });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, [idd]);

  return (
    <div className="bg-white">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
          Erro
        </div>
      ) : (
        <OrderInfo encomenda={encomenda} />
      )}
    </div>
  );
}

/**
 * 
 * <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                      >
                        Imagem
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                      >
                        Tamanho
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal sm:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-0 py-3 font-normal text-right"
                      >
                        How is the Order?
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                    {encomenda.imagens.map((imagem, i) => (
                      <tr key={i}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={imagem.caminho.slice(53)}
                              alt="Imagem Encomendada"
                              className="w-16 h-16 object-center object-cover rounded mr-6"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {imagem.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {imagem.tamanho}
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {'incompleted' === 'incompleted' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-red-800">
                              Incomplete
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                              Completed
                            </span>
                          )}
                        </td>

                        <td className="py-6 font-medium text-right whitespace-nowrap">
                          {'incompleted' === 'incompleted' ? (
                            <button className="w-full flex items-center justify-center bg-green-300 mt-6 py-2 px-4 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-900 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                              Completed
                            </button>
                          ) : (
                            <button className="w-full flex items-center justify-center bg-red-300 mt-6 py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-900 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                              Incompleted
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
 */

/**
 * 
 * 
 *  <div className="max-w-xl ">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Encomenda
            </h1>
          </div>

          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              <div>
                <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                  <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-2 sm:grid sm:grid-cols-2 sm:gap-x-3 lg:w-1/1 lg:flex-none lg:gap-x-10">
                    <div className="flex justify-between sm:block">
                      <dt className="font-medium text-gray-900">
                        Data da Encomenda:
                      </dt>
                      <dd className="sm:mt-1">
                        {encomenda.createdAt.slice(0, 10)}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Número do Pedido:
                      </dt>
                      <dd className="sm:mt-1">{encomenda.enco_num}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Nome:</dt>
                      <dd className="sm:mt-1">
                        {encomenda.enco_namepro} {encomenda.enco_nameapl}
                      </dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Email:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_email}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Telemóvel:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_telemovel}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Morada: </dt>
                      <dd className="sm:mt-1">{encomenda.enco_morada}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">
                        Código Postal:
                      </dt>
                      <dd className="sm:mt-1">{encomenda.enco_postal}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Cidade:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_cidade}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">País:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_pais}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Método:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_metodoEt}</dd>
                    </div>
                    <div className="flex justify-between pt-4 sm:block sm:pt-0">
                      <dt className="font-medium text-gray-900">Total:</dt>
                      <dd className="sm:mt-1">{encomenda.enco_preco} €</dd>
                    </div>
                  </dl>
                </div>

                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <caption className="sr-only">Products</caption>
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                      >
                        Imagem
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                      >
                        Tamanho
                      </th>
                      <th
                        scope="col"
                        className="hidden pr-8 py-3 font-normal sm:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="w-0 py-3 font-normal text-right"
                      >
                        How is the Order?
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                    {imagens.map((imagem, i) => (
                      <tr key={i}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <img
                              src={imagem.caminho.slice(53)}
                              alt="Imagem Encomendada"
                              className="w-16 h-16 object-center object-cover rounded mr-6"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {imagem.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {imagem.tamanho}
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {'incompleted' === 'incompleted' ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-300 text-red-800">
                              Incomplete
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-300 text-green-800">
                              Completed
                            </span>
                          )}
                        </td>

                        <td className="py-6 font-medium text-right whitespace-nowrap">
                          {'incompleted' === 'incompleted' ? (
                            <button className="w-full flex items-center justify-center bg-green-300 mt-6 py-2 px-4 border border-green-300 rounded-md shadow-sm text-sm font-medium text-green-900 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                              Completed
                            </button>
                          ) : (
                            <button className="w-full flex items-center justify-center bg-red-300 mt-6 py-2 px-4 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-900 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0">
                              Incompleted
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
 */
