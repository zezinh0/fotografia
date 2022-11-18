import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid';
import { PlusSmIcon as PlusSmIconOutline } from '@heroicons/react/outline';

export default function ListofOrders(props) {
  const encomendass = props.encomendass;
  console.log('yyyyy');
  console.log('yyyyy');
  console.log(props.encomendass);
  console.log(encomendass);

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
    <table className="min-w-full divide-y divide-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
          >
            Order Number
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Amount
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Date
          </th>

          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            State
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Details</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {encomendass.map((encomenda) => (
          <tr key={encomenda._id}>
            <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-blue-500 sm:w-auto sm:max-w-none sm:pl-6">
              <Link
                to={`/eachorder/${encomenda._id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                {encomenda.enco_num.toUpperCase()}
              </Link>

              <dl className="font-normal lg:hidden">
                <dt className="sr-only">Total</dt>
                <dd className="mt-1 truncate text-gray-500 ">
                  {encomenda.enco_total} €
                </dd>
                <dt className="sr-only sm:hidden">Date</dt>
                <dd className="mt-1 truncate text-gray-500 sm:hidden">
                  <time> {encomenda.createdAt.slice(0, 10)}</time>
                </dd>
              </dl>
            </td>
            <td className="hidden px-3 py-4 text-sm lg:table-cell">
              {encomenda.enco_total} €
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              <time> {encomenda.createdAt.slice(0, 10)}</time>
            </td>
            {encomenda.enco_estado === '1' ? (
              <td className="hidden px-3 py-4 text-sm text-red-500 sm:table-cell">
                Created
              </td>
            ) : encomenda.enco_estado === '2' ? (
              <td className="hidden px-3 py-4 text-sm text-red-500 sm:table-cell">
                Processing
              </td>
            ) : encomenda.enco_estado === '3' ? (
              <td className="hidden px-3 py-4 text-sm text-yellow-500 sm:table-cell">
                Sent
              </td>
            ) : (
              <td className="hidden px-3 py-4 text-sm text-green-500 sm:table-cell">
                Delivered
              </td>
            )}

            <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
              <Link
                to={`/eachorder/${encomenda._id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
