import { Fragment, useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
export default function PaymentSucess() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  console.log(state);

  const send = () => {
    let send = [];
    for (const element of state.cart.cartItems) {
      send.push({
        esc_id_image: element.esc_id,
        esc_id_tamanho: element.esc_id_tamanho,
        quantity: element.quantity,
      });
    }
    for (const element of state.cart.cartItemsDownload) {
      send.push({
        esc_id_image: element.esc_id,
        esc_id_tamanho: element.esc_id_tamanho,
        quantity: element.quantity,
      });
    }
    return send;
  };

  const fetchData = async () => {
    console.log('CORRI');

    try {
      let information = new FormData();
      if (state.cart.discount !== '') {
        if (
          state.cart.cartItems.length === 0 &&
          state.cart.cartItemsDownload.length > 0
        ) {
          information.append(
            'information',
            JSON.stringify({
              enco_namepro: state.cart.information.enco_namepro,
              enco_nameapl: state.cart.information.enco_nameapl,
              enco_email: state.cart.information.enco_email,
              enco_info: state.cart.information.enco_info,
              enco_morada: state.cart.information.enco_morada,
              enco_nif: state.cart.information.enco_nif,
              enco_pais: state.cart.information.enco_pais,
              enco_postal: state.cart.information.enco_postal,
              enco_telemovel: state.cart.information.enco_telemovel,
              enco_total: state.cart.information.enco_total,
              enco_shippingid: state.cart.metodo.id,
              enco_shippingt: state.cart.metodo.title,
              enco_shippingp: state.cart.metodo.price,
              grupo_id: state.cart.grupo.grupo_id,
              user_email: state.cart.grupo.user_email,
              user_id: state.cart.grupo.user_id,
              enco_disid: state.cart.discount.dis_id,
              enco_disname: state.cart.discount.dis_name,
              enco_disnum: state.cart.discount.dis_num,
              enco_cidade: state.cart.information.enco_cidade,
              enco_distrito: state.cart.information.enco_distrito,
              enco_subtotal: state.cart.information.enco_subtotal,
              enco_estado: '4',
            })
          );
        } else {
          information.append(
            'information',
            JSON.stringify({
              enco_namepro: state.cart.information.enco_namepro,
              enco_nameapl: state.cart.information.enco_nameapl,
              enco_email: state.cart.information.enco_email,
              enco_info: state.cart.information.enco_info,
              enco_morada: state.cart.information.enco_morada,
              enco_nif: state.cart.information.enco_nif,
              enco_pais: state.cart.information.enco_pais,
              enco_postal: state.cart.information.enco_postal,
              enco_telemovel: state.cart.information.enco_telemovel,
              enco_total: state.cart.information.enco_total,
              enco_shippingid: state.cart.metodo.id,
              enco_shippingt: state.cart.metodo.title,
              enco_shippingp: state.cart.metodo.price,
              grupo_id: state.cart.grupo.grupo_id,
              user_email: state.cart.grupo.user_email,
              user_id: state.cart.grupo.user_id,
              enco_disid: state.cart.discount.dis_id,
              enco_disname: state.cart.discount.dis_name,
              enco_disnum: state.cart.discount.dis_num,
              enco_cidade: state.cart.information.enco_cidade,
              enco_distrito: state.cart.information.enco_distrito,
              enco_subtotal: state.cart.information.enco_subtotal,
              enco_estado: '1',
            })
          );
        }

        //information.append('images', JSON.stringify(send()));
      } else {
        if (
          state.cart.cartItems.length === 0 &&
          state.cart.cartItemsDownload.length > 0
        ) {
          information.append(
            'information',
            JSON.stringify({
              enco_namepro: state.cart.information.enco_namepro,
              enco_nameapl: state.cart.information.enco_nameapl,
              enco_email: state.cart.information.enco_email,
              enco_info: state.cart.information.enco_info,
              enco_morada: state.cart.information.enco_morada,
              enco_nif: state.cart.information.enco_nif,
              enco_pais: state.cart.information.enco_pais,
              enco_postal: state.cart.information.enco_postal,
              enco_telemovel: state.cart.information.enco_telemovel,
              enco_total: state.cart.information.enco_total,
              enco_shippingid: state.cart.metodo.id,
              enco_shippingt: state.cart.metodo.title,
              enco_shippingp: state.cart.metodo.price,
              grupo_id: state.cart.grupo.grupo_id,
              user_email: state.cart.grupo.user_email,
              user_id: state.cart.grupo.user_id,
              enco_disid: '',
              enco_disname: '',
              enco_disnum: '',
              enco_subtotal: state.cart.information.enco_subtotal,
              enco_estado: '4',
            })
          );
        } else {
          information.append(
            'information',
            JSON.stringify({
              enco_namepro: state.cart.information.enco_namepro,
              enco_nameapl: state.cart.information.enco_nameapl,
              enco_email: state.cart.information.enco_email,
              enco_info: state.cart.information.enco_info,
              enco_morada: state.cart.information.enco_morada,
              enco_nif: state.cart.information.enco_nif,
              enco_pais: state.cart.information.enco_pais,
              enco_postal: state.cart.information.enco_postal,
              enco_telemovel: state.cart.information.enco_telemovel,
              enco_total: state.cart.information.enco_total,
              enco_shippingid: state.cart.metodo.id,
              enco_shippingt: state.cart.metodo.title,
              enco_shippingp: state.cart.metodo.price,
              grupo_id: state.cart.grupo.grupo_id,
              user_email: state.cart.grupo.user_email,
              user_id: state.cart.grupo.user_id,
              enco_disid: state.cart.discount.dis_id,
              enco_disname: state.cart.discount.dis_name,
              enco_disnum: state.cart.discount.dis_num,
              enco_cidade: state.cart.information.enco_cidade,
              enco_distrito: state.cart.information.enco_distrito,
              enco_subtotal: state.cart.information.enco_subtotal,
              enco_estado: '1',
            })
          );
        }

        //information.append('images', JSON.stringify(send()));
      }
      console.log('EU ESTOU AQUI CARAGO');

      const res = await axios.post(
        `/api/encomenda/criarencomenda/`,
        information
      );

      let send2 = JSON.stringify({
        imagenc_id: send(),
        enco_id: res.data.data._id,
      });
      console.log(send2);
      information.append('images', send2);

      const res2 = await axios.post(
        `/api/encomenda/criarimagens/`,
        information
      );

      console.log(res2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('ENTREIIIIIIIIIIIIIIIII');

    //ctxDispatch({ type: 'CART_REMOVE_ALL' });
    //ctxDispatch({ type: 'METODO_REMOVE' });
    //ctxDispatch({ type: 'DISCOUNT_REMOVE' });
    //ctxDispatch({ type: 'GRUPO_REMOVE' });
    //ctxDispatch({ type: 'INFORMATION_REMOVE' });
    return () => {
      // Side Effect Cleanup
      if (
        state.cart.cartItems.length > 0 ||
        state.cart.cartItemsDownload.length > 0
      ) {
        console.log('OIOIOOIOI');
        fetchData();
      }

      for (const element of state.cart.cartItemsDownload) {
        saveAs(element.esc_caminho, 'image.jpg');
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl text-center font-bold">
            Thank You For the Purchase!
          </h1>
          <p></p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-sm font-medium">Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
