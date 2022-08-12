import React, { useEffect, useReducer, useState } from 'react';
import { clientes } from '../data2';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListofOrders from '../Components/ListofOrders';
import Loading from '../Components/Loading';

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
      const enco = [action.payload];
      return { ...state, encomendass: enco, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function Orders() {
  const user_id = '62ddf3fd1c19bc83e0778fbe';
  const [{ loading, error, encomendass }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    encomendass: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/grupos/${user_id}`);

        let array = [];
        result.data.map(async (grupo) => {
          console.log('TYTTTTTTT');
          console.log(grupo);
          const result2 = await axios.get(
            `/api/encomenda/encomendas/${grupo._id}`
          );
          let arr = [];
          if (result2.data.length > 0) {
            result2.data.forEach((element) => {
              arr.push(element);
            });
          }
          array.push({
            grupo_codigo: grupo.grupo_codigo,
            grupo_name: grupo.grupo_name,
            enco: arr,
          });
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
        <h1 className="text-3xl font-semibold text-gray-900">Encomendas</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 md:px-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <div>
            <ListofOrders encomendass={encomendass} />
          </div>
        ) : (
          <div>
            <ListofOrders encomendass={encomendass} />
          </div>
        )}
      </div>
    </div>
  );
}
