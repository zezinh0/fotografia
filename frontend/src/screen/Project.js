import React, { useEffect, useReducer, useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { clientes } from '../data2.js';
import ListofProject from '../Components/ListofProject.js';
import ButtonNew from '../Components/ButtonNew.js';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Loading from '../Components/Loading.js';

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
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Projetos</h1>
      </div>
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
    </div>
  );
}
