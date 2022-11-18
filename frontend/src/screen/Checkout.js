import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { Store } from '../Store';
import axios from 'axios';

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

const products = [
  {
    id: 1,
    title: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },

  // More products...
];
const deliveryMethods = [
  {
    id: 1,
    title: 'Fotos Digitais',
    //turnaround: '4–10 business days',
    price: 0,
  },
  {
    id: 2,
    title: 'Album',
    //turnaround: '2–5 business days',
    price: 20,
  },
  {
    id: 3,
    title: 'Fotos Digitais e Album',
    //turnaround: '2–5 business days',
    price: 20,
  },
];
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Checkout() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [success, setSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [clientSecrett, setClientSecrett] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [enco_namepro, setEnco_namepro] = useState('');
  const [enco_nameapl, setEnco_nameapl] = useState('');
  const [enco_email, setEnco_email] = useState('');
  const [enco_telemovel, setEnco_telemovel] = useState('');
  const [enco_morada, setEnco_morada] = useState('');
  const [enco_pais, setEnco_pais] = useState('');
  const [enco_postal, setEnco_postal] = useState('');
  const [enco_cidade, setEnco_cidade] = useState('');
  const [enco_nif, setEnco_nif] = useState('');
  const [enco_info, setEnco_info] = useState('');
  const [enco_preco, setEnco_preco] = useState('');
  const [enco_pagamanto, setEnco_pagamanto] = useState('');
  const [enco_metodo, setEnco_metodo] = useState('');
  const [enco_estado, setEnco_estado] = useState('');
  const [enco_fechada, setEnco_fechada] = useState('');
  const [enco_metodoP, setEnco_metodoP] = useState('');
  const [grupo_id, setGrupo_id] = useState('');
  const [enco_num, setEnco_num] = useState('');

  const subtotal = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );
  const stripePromise = loadStripe(
    ''
  );
  console.log(state);
  useEffect(() => {
    const fetchData = async () => {
      //dispatch({ type: 'FETCH_REQUEST' });
      let formData = new FormData();
      console.log('tttttttttttttttttttttt');
      let total = subtotal + state.cart.metodo.price;

      formData.append('total', total);
      formData.append('payment_method_types', 'card');
      try {
        const result = await axios.post(
          `/api/encomenda/create-payment-intent`,
          formData
        );
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log('iiiiiiiiiiiiiiiiiiiiiiii');
        console.log(result.data.clientSecret);
        setClientSecrett(result.data.clientSecret);
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, [subtotal, state]);

  console.log(clientSecret);

  const updateCartHandler = (image, quantityUpdate) => {
    console.log('MMMMMM');
    if (quantityUpdate < 1) {
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...image, quantity: quantityUpdate },
    });
  };
  const appearance = {
    theme: 'stripe',

    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    },
    hidePostalCode: true,
  };

  const options = {
    clientSecrett,
    appearance,
  };
  const confirmar_pedido = async () => {
    /*
      let id = '99';
    let imagenc_id = '';
    let formData = new FormData();
    formData.append('enco_id', id);
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
    formData.append('imagenc_id', imagenc_id);

    try {
      const res = await axios.post(`/api/encomenda/criarimagens`, formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  */
  };

  const removeImageHandler = (image) => {
    console.log('tatatata');
    console.log(image);
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: image });
  };
  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Infomação de Contacto
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome Próprio
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      autoComplete="given-name"
                      onChange={(e) => setEnco_namepro(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apelido
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      autoComplete="family-name"
                      onChange={(e) => setEnco_nameapl(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      onChange={(e) => setEnco_email(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Telemóvel
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      onChange={(e) => setEnco_telemovel(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    NIF
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      onChange={(e) => setEnco_nif(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 mt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Infomação de Envio
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Morada (rua,número de porta, Bairro)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      onChange={(e) => setEnco_morada(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/*<div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    País
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United States</option>
                      <option>Portugal</option>
                    </select>
                  </div>
                </div> */}

                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Código postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="province"
                      id="province"
                      onChange={(e) => setEnco_postal(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cidade
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      onChange={(e) => setEnco_cidade(e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Infomações Adicionais
                  </label>
                  <div className="mt-1">
                    <textarea
                      type="about"
                      name="about"
                      id="address"
                      rows={4}
                      autoComplete="street-address"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      defaultValue={''}
                      onChange={(e) => setEnco_info(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment 
            
              <Elements options={options} stripe={stripePromise}>
                <CardElement options={appearance} />
              </Elements>
            */}
            {/*
              <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            */}
          </div>

          <div className="mt-10 lg:mt-0">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                selectedDeliveryMethod={selectedDeliveryMethod}
                enco_namepro={enco_namepro}
                enco_nameapl={enco_nameapl}
                enco_email={enco_email}
                enco_telemovel={enco_telemovel}
                enco_nif={enco_nif}
                enco_morada={enco_morada}
                enco_pais={enco_pais}
                enco_postal={enco_postal}
                enco_cidade={enco_cidade}
                enco_info={enco_info}
              ></CheckoutForm>
            </Elements>
          </div>
          {/* Order summary 
          <div className="mt-10 lg:mt-0">
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
                            {image.esc_largura +
                              ' cm X ' +
                              image.esc_altura +
                              ' cm'}
                          </h4>
                        </div>
                        ////////////////////////////////////////////////////////////////////////
                        {/*<div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                            onClick={() => removeImageHandler(image)}
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                        ////////////////////////////////////////////////////////////////////////
                        
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
  ////////////////////////////////////////////////
<div className="py-4 flex items-center justify-between">
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
</div>
////////////////////////////////////////////////////////////////////////
<dl className="-my-4 text-sm divide-y divide-gray-200">
<div className="py-4 flex items-center justify-between">
<dt className="text-base font-medium text-gray-900">
  Total:
</dt>
<dd className="text-base font-medium text-gray-900">
  {subtotal > 0 ? subtotal : 0} €
</dd>
</div>
<div className="py-4 ">
<dt className="text-base font-medium text-gray-900"></dt>
<dd className="text-base font-medium text-gray-900">
  <Elements stripe={stripePromise} options={appearance}>
    <CheckoutForm subtotal={subtotal} />
  </Elements>
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
          
          */}
        </div>
      </div>
    </div>
  );
}
