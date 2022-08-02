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
    case 'CART_REMOVE_ITEM':
      const cartItemss = state.cart.cartItems.filter(
        (item) =>
          item.esc_id !== action.payload.esc_id ||
          item.esc_id_tamanho !== action.payload.esc_id_tamanho
      );
      localStorage.setItem('cartImages', JSON.stringify(cartItemss));
      return { ...state, cart: { ...state.cart, cartItems: cartItemss } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
