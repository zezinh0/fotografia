import React, { useEffect, useReducer, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { clientes } from '../data2.js';
import ListofProject from '../Components/ListofProject.js';
import ButtonNew from '../Components/ButtonNew.js';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Loading from '../Components/Loading.js';
import HeaderPho from './HeaderPho.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, eventos: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Project() {
  const user_id = '62ddf3fd1c19bc83e0778fbe';

  const [{ loading, error, eventos }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    eventos: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/grupos/${user_id}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-full">
      <HeaderPho />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl tracking-tight font-bold text-gray-900">
            Grupos
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {loading ? (
            <Loading />
          ) : error ? (
            <div>
              <ButtonNew eventos={eventos} />
              <ListofProject eventos={eventos} />
            </div>
          ) : (
            <div>
              <ButtonNew eventos={eventos} />
              <ListofProject eventos={eventos} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
