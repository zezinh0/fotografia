import { createContext, useReducer } from 'react';
import logger from 'use-reducer-logger';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartImages')
      ? JSON.parse(localStorage.getItem('cartImages'))
      : [],
    grupo: localStorage.getItem('grupo')
      ? JSON.parse(localStorage.getItem('grupo'))
      : '',
    metodo: localStorage.getItem('metodo')
      ? JSON.parse(localStorage.getItem('metodo'))
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) =>
          item.esc_id === newItem.esc_id &&
          item.esc_id_tamanho === newItem.esc_id_tamanho
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.esc_id === existItem.esc_id &&
            item.esc_id_tamanho === existItem.esc_id_tamanho
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartImages', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems,
        },
      };
    case 'GUPO_ADD':
      localStorage.setItem('grupo', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          grupo: action.payload,
        },
      };
    case 'METODO_ADD':
      localStorage.setItem('metodo', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          metodo: action.payload,
        },
      };
    case 'CART_REMOVE_ITEM':
      const cartItemss = state.cart.cartItems.filter(
        (item) =>
          item.esc_id !== action.payload.esc_id ||
          item.esc_id_tamanho !== action.payload.esc_id_tamanho
      );
      localStorage.setItem('cartImages', JSON.stringify(cartItemss));
      return { ...state, cart: { ...state.cart, cartItems: cartItemss } };
    case 'CART_REMOVE_ALL':
      const cartItemsss = [];
      localStorage.setItem('cartImages', JSON.stringify(cartItemsss));
      return { ...state, cart: { ...state.cart, cartItems: cartItemsss } };
    case 'METODO_REMOVE':
      const metodo = '';
      localStorage.setItem('metodo', JSON.stringify(metodo));
      return { ...state, cart: { ...state.cart, metodo: metodo } };
    case 'GRUPO_REMOVE':
      const grupo = '';
      localStorage.setItem('grupo', JSON.stringify(grupo));
      return { ...state, cart: { ...state.cart, grupo: grupo } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
