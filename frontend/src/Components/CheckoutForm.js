import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { Store } from '../Store';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutForm(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const subtotal = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );
  console.log('okokokokk');
  console.log(subtotal);

  const total = subtotal + state.cart.metodo.price;

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      colorPrimaryText: '#262626',
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px',
      },
      '.Input': {
        padding: '12px',
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: 'lightgray',
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none',
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow:
          '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)',
      },
      '.Label': {
        fontWeight: '500',
      },
    },
    hidePostalCode: true,
  };

  const confirmar_pedido = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log('Stripe.js has not yet loaded.');
      return;
    }
    let formData = new FormData();
    formData.append('total', total);
    formData.append('payment_method_types', 'card');

    try {
      const result = await axios.post(
        `/api/encomenda/create-payment-intent`,
        formData
      );
      console.log('Client secret returned');

      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(result.data.clientSecret, {
          receipt_email: 'ze_manuel_costa1998@hotmail.com',
          payment_method: {
            card: cardElement,
            billing_details: {
              name: props.enco_namepro + ' ' + props.enco_nameapl,
              email: props.enco_email,
              phone: props.enco_telemovel,
            },
          },
        });

      if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        console.log('errrO');
        console.log(stripeError.message);
        return;
      }

      // Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      console.log(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);

      try {
        let encomenda = new FormData();
        encomenda.append('enco_namepro', props.enco_namepro);
        encomenda.append('enco_nameapl', props.enco_nameapl);
        encomenda.append('enco_email', props.enco_email);
        encomenda.append('enco_telemovel', props.enco_telemovel);
        encomenda.append('enco_morada', props.enco_morada);
        encomenda.append('enco_pais', 'Portugal');
        encomenda.append('enco_postal', props.enco_postal);
        encomenda.append('enco_cidade', props.enco_cidade);
        encomenda.append('enco_nif', props.enco_nif);
        encomenda.append('enco_info', props.enco_info);
        encomenda.append('enco_preco', total);
        encomenda.append('enco_pagamanto', '1');
        encomenda.append('enco_estado', 'Em Preparação');
        encomenda.append('enco_fechada', '0');
        encomenda.append('enco_metodoP', 'credit card');
        encomenda.append('enco_metodoEt', props.selectedDeliveryMethod.title);
        encomenda.append('enco_metodoEp', props.selectedDeliveryMethod.price);
        encomenda.append('grupo_id', state.cart.grupo);
        encomenda.append('enco_num', uuidv4());
        const res = await axios.post(
          `/api/encomenda/criarencomenda/`,
          encomenda
        );

        // Clear percentage
        console.log(res);
        let imageData = new FormData();
        let imagenc_id = '';
        imageData.append('enco_id', res.data._id);
        state.cart.cartItems.forEach((element) => {
          imagenc_id =
            imagenc_id +
            ('' +
              element.esc_id +
              '-' +
              element.esc_largura +
              ' cm X ' +
              element.esc_altura +
              ' cm-' +
              element.esc_price +
              '-' +
              element.esc_id_tamanho +
              ',');
        });
        imageData.append('imagenc_id', imagenc_id);

        try {
          const resp = await axios.post(
            `/api/encomenda/criarimagens`,
            imageData
          );
          console.log(resp);
          console.log('FETCH_SUCCESS');
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log('FETCH_FAIL');
        //dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Order summary */}

      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h3 className="sr-only">Items in your cart</h3>
        <ul className="divide-y divide-gray-200">
          {state.cart.cartItems.map((image, i) => (
            <li key={i} className="flex py-6 px-4 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  src={image.esc_caminho}
                  alt="Imagem Escolhida"
                  className="w-24 h-24  rounded-md"
                />
              </div>

              <div className="ml-6 flex-1 flex flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      {' '}
                      Tamanho:{' '}
                      {image.esc_largura + ' cm X ' + image.esc_altura + ' cm'}
                    </h4>
                  </div>
                  {/*<div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            onClick={() => removeImageHandler(image)}
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>*/}
                </div>

                <div className="flex-1 pt-2 flex items-end justify-between">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {'Quantidade: '}
                    {image.quantity}
                  </p>

                  <div>
                    <div className="flex flex-row  rounded-lg relative bg-transparent mt-1">
                      <div>
                        <div className="flex flex-row  rounded-lg relative bg-transparent mt-1">
                          <p className="text-base font-medium text-gray-900 ml-2">
                            {image.quantity}
                            {' x '}
                            {image.esc_price} €
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 p-6 sm:p-8 sm:rounded-lg">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <div className="flow-root">
            {/*<div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">${subtotal}</dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="font-medium text-gray-900">
                        ${subtotal > 0 ? 5 : 0}
                      </dd>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                      <dt className="text-gray-600">Tax</dt>
                      <dd className="font-medium text-gray-900">
                        ${subtotal > 0 ? 5 : 0}
                      </dd>
                    </div>*/}
            <dl className="-my-4 text-sm divide-y divide-gray-200">
              <div className="py-4 flex items-center justify-between">
                <dt className="text-base font-medium text-gray-900">
                  Método Escolhido:
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {state.cart.metodo.title} - {state.cart.metodo.price} €
                </dd>
              </div>
              <div className="py-8 flex items-center justify-between">
                <dt className="text-base text-lg font-medium text-gray-900">
                  Total:
                </dt>
                <dd className="text-base text-lg font-medium text-gray-900">
                  {total > 0 ? total : 0} €
                </dd>
              </div>
              <div className="py-4 ">
                <dt className="text-base font-medium text-gray-900">
                  Cartão de Crédito
                </dt>
                <dd className="py-4 text-base font-medium text-gray-900">
                  <CardElement id="card" options={appearance} />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            onClick={() => confirmar_pedido()}
          >
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}
