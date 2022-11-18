import { createContext, useReducer } from 'react';
import logger from 'use-reducer-logger';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartImages')
      ? JSON.parse(localStorage.getItem('cartImages'))
      : [],
    cartItemsDownload: localStorage.getItem('cartImagesDownload')
      ? JSON.parse(localStorage.getItem('cartImagesDownload'))
      : [],
    grupo: localStorage.getItem('grupo')
      ? JSON.parse(localStorage.getItem('grupo'))
      : '',
    metodo: localStorage.getItem('metodo')
      ? JSON.parse(localStorage.getItem('metodo'))
      : '',
    discount: localStorage.getItem('discount')
      ? JSON.parse(localStorage.getItem('discount'))
      : '',
    information: localStorage.getItem('information')
      ? JSON.parse(localStorage.getItem('information'))
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
              ? { ...newItem, quantity: item.quantity + 1 }
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
    case 'CART_ADD_ITEM_DOWNLOAD':
      const newItemDownload = action.payload;
      const existItemDownload = state.cart.cartItemsDownload.find(
        (item) =>
          item.esc_id === newItemDownload.esc_id &&
          item.esc_id_tamanho === newItemDownload.esc_id_tamanho
      );

      const cartItemsDownload = existItemDownload
        ? state.cart.cartItemsDownload.map((item) =>
            item.esc_id === existItemDownload.esc_id &&
            item.esc_id_tamanho === existItemDownload.esc_id_tamanho
              ? { ...newItemDownload, quantity: 1 }
              : item
          )
        : [...state.cart.cartItemsDownload, newItemDownload];

      localStorage.setItem(
        'cartImagesDownload',
        JSON.stringify(cartItemsDownload)
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItemsDownload,
        },
      };
    case 'CART_ADD_ITEM2':
      const newItem2 = action.payload;

      const cartItems2 = state.cart.cartItems.map((item) =>
        item.esc_id === newItem2.esc_id &&
        item.esc_id_tamanho === newItem2.esc_id_tamanho
          ? newItem2
          : item
      );

      localStorage.setItem('cartImages', JSON.stringify(cartItems2));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems2,
        },
      };
    case 'CART_ADD_ITEM_DOWNLOAD2':
      const newItem222 = action.payload;

      const cartItems222 = state.cart.cartItemsDownload.map((item) =>
        item.esc_id === newItem222.esc_id &&
        item.esc_id_tamanho === newItem222.esc_id_tamanho
          ? newItem222
          : item
      );

      localStorage.setItem('cartImagesDownload', JSON.stringify(cartItems222));
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItemsDownload: cartItems222,
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
    case 'DISCOUNT_ADD':
      localStorage.setItem('discount', JSON.stringify(action.payload));

      return {
        ...state,
        cart: {
          ...state.cart,
          discount: action.payload,
        },
      };
    case 'INFORMATION_ADD':
      localStorage.setItem('information', JSON.stringify(action.payload));
      return {
        ...state,
        cart: {
          ...state.cart,
          information: action.payload,
        },
      };
    case 'CART_REMOVE_ITEM':
      let cartItemss = state.cart.cartItems.filter(
        (item) =>
          item.esc_id !== action.payload.esc_id ||
          item.esc_id_tamanho !== action.payload.esc_id_tamanho
      );
      localStorage.setItem('cartImages', JSON.stringify(cartItemss));
      return { ...state, cart: { ...state.cart, cartItems: cartItemss } };
    case 'CART_REMOVE_ITEM_DOWNLOAD':
      let cartItemssss = state.cart.cartItemsDownload.filter(
        (item) =>
          item.esc_id !== action.payload.esc_id ||
          item.esc_id_tamanho !== action.payload.esc_id_tamanho
      );
      localStorage.setItem('cartImagesDownload', JSON.stringify(cartItemssss));
      return {
        ...state,
        cart: { ...state.cart, cartItemsDownload: cartItemssss },
      };
    case 'CART_REMOVE_ALL':
      let cartItemsss = [];
      localStorage.setItem('cartImages', JSON.stringify(cartItemsss));
      return { ...state, cart: { ...state.cart, cartItems: cartItemsss } };
    case 'METODO_REMOVE':
      let metodo = '';
      localStorage.setItem('metodo', JSON.stringify(metodo));
      return { ...state, cart: { ...state.cart, metodo: metodo } };
    case 'DISCOUNT_REMOVE':
      let discount = '';
      localStorage.setItem('discount', JSON.stringify(discount));
      return { ...state, cart: { ...state.cart, discount: discount } };
    case 'GRUPO_REMOVE':
      let grupo = '';
      localStorage.setItem('grupo', JSON.stringify(grupo));
      return { ...state, cart: { ...state.cart, grupo: grupo } };
    case 'INFORMATION_REMOVE':
      let information = '';
      localStorage.setItem('information', JSON.stringify(information));
      return { ...state, cart: { ...state.cart, information: information } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(logger(reducer), initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
