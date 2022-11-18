/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { Fragment, useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
  HomeIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Header2 from './Header2';

import { Watermark } from '@hirohe/react-watermark';
const pages = [
  { name: 'Shopping Cart', href: '#', current: true },
  //{ name: 'Project Nero', href: '#', current: true },
];
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
];
const steps = [
  { name: 'Cart', href: '/checkout/cart', status: 'current' },
  { name: 'Shipping', href: '#', status: 'upcoming' },
  { name: 'Payment', href: '#', status: 'upcoming' },
];

export default function CheckoutPayment() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  console.log(state);
  const [discount, setDiscount] = useState('');
  console.log(discount);
  useEffect(() => {
    //ctxDispatch({ type: 'DISCOUNT_ADD', payload: [dis, 0] });
  }, []);

  const updateCartHandler = (image, quantityUpdate) => {
    console.log('MMMMMM');
    if (quantityUpdate < 1) {
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM2',
      payload: { ...image, quantity: quantityUpdate },
    });
  };
  const updateCartHandler2 = (image, quantityUpdate) => {
    console.log('NNNNNN');
    console.log(image);
    if (quantityUpdate < 1) {
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM_DOWNLOAD2',
      payload: { ...image, quantity: quantityUpdate },
    });
  };

  const removeImageHandler = (image) => {
    console.log('tatatata');
    console.log(image);
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: image });
  };
  const removeImageHandler2 = (image) => {
    console.log('tatatata');
    console.log(image);
    ctxDispatch({ type: 'CART_REMOVE_ITEM_DOWNLOAD', payload: image });
  };

  const subtotal1 = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );

  const subtotal2 = state.cart.cartItemsDownload.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );

  const subtotal3 = subtotal1 + subtotal2;
  const discount2 = state.cart.discount.dis_num
    ? state.cart.discount.dis_num
    : 0;

  const total = (subtotal3 - subtotal3 * (discount2 / 100)).toFixed(2);
  const Discount = () => {
    console.log('AQUIIUUIUIUI');
    console.log('AQUIIUUIUIUI');
    console.log('AQUIIUUIUIUI');

    const fetchData = async () => {
      //dispatch({ type: 'FETCH_REQUEST' });
      console.log('ESTOU AQUI');

      try {
        const result = await axios.get(
          `/api/grupos/grupo/discount/${state.cart.grupo.grupo_id}?discount=${discount}`
        );
        console.log('AQUIIUUIUIUI');
        console.log(result.data.data.name);
        console.log(result.data.data.number);
        console.log(result.data.data.id);
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        ctxDispatch({
          type: 'DISCOUNT_ADD',
          payload: {
            dis_name: result.data.data.name,
            dis_num: result.data.data.number,
            dis_id: result.data.data.id,
          },
        });
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });

        alert('Discount does not Exist');
        console.log('ERRRRRRO');
      }
      // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    };
    fetchData();

    {
      /*
    
     ctxDispatch({
      type: 'DISCOUNT_ADD',
      payload: { dis_name: discount, dis_num: 10, dis_id: 1 },
    });*/
    }
    setDiscount('');
    return;
  };

  const articles = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const articles2 = state.cart.cartItemsDownload.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const totalarticle = articles + articles2;

  return (
    <div>
      <Header2></Header2>
      <div className="bg-white ">
        <div className="max-w-2xl mx-auto pt-8 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <nav aria-label="Progress" className="hidden sm:block">
              <ol className="flex space-x-4">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center text-lg">
                    {step.status === 'current' ? (
                      <p aria-current="page" className="text-indigo-600">
                        {step.name}
                      </p>
                    ) : step.status === 'completed' ? (
                      <a href={step.href} className="text-green-600">
                        {step.name}
                      </a>
                    ) : (
                      <p href={step.href}>{step.name}</p>
                    )}

                    {stepIdx !== steps.length - 1 ? (
                      <ChevronRightIcon
                        className="w-5 h-5 text-gray-300 ml-4"
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="sm:hidden">Step 1 of 4</p>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16 ">
            <section aria-labelledby="cart-heading" className="lg:col-span-7 ">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul className="px-4 py-6 sm:p-6 lg:p-8  shadow rounded border-gray-200 divide-y divide-gray-200">
                {state.cart.cartItems.map((image, productIdx) => (
                  <li key={productIdx} className="flex py-6 sm:py-6">
                    <div className="flex-shrink-0">
                      <Watermark show="false" text="Mark" opacity="0.5">
                        <img
                          src={image.esc_caminho}
                          alt="Imagem escolhida
                      "
                          className="w-28 h-28 rounded-md object-center object-cover sm:w-28 sm:h-28"
                        />
                      </Watermark>
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-500"></h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">
                              Sent Home: {image.esc_largura} cm x{' '}
                              {image.esc_altura} cm
                            </p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {image.esc_price} €
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {image.quantity}
                          </label>
                          <div>
                            <div className="flex flex-row  rounded-lg relative bg-transparent ">
                              <button
                                data-action="decrement"
                                onClick={() =>
                                  updateCartHandler(image, image.quantity - 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              <p className="text-base font-medium text-gray-900 ml-2">
                                {image.quantity}
                              </p>

                              <button
                                data-action="increment"
                                className="ml-2"
                                onClick={() =>
                                  updateCartHandler(image, image.quantity + 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              onClick={() => removeImageHandler(image)}
                            >
                              <span className="sr-only">Remove</span>
                              <XIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {state.cart.cartItemsDownload.map((image2, productIdx) => (
                  <li key={productIdx} className="flex py-6 sm:py-6">
                    <div className="flex-shrink-0">
                      <Watermark show="false" text="Mark" opacity="0.5">
                        <img
                          src={image2.esc_caminho}
                          alt="Imagem escolhida
                      "
                          className="w-28 h-28 rounded-md object-center object-cover sm:w-28 sm:h-28"
                        />
                      </Watermark>
                    </div>

                    <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-500"></h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">Download</p>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {image2.esc_price} €
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label
                            htmlFor={`quantity-${productIdx}`}
                            className="sr-only"
                          >
                            Quantity, {image2.quantity}
                          </label>
                          <div>
                            <div className="flex flex-row  rounded-lg relative bg-transparent "></div>
                          </div>

                          <div className="absolute top-0 right-0">
                            <button
                              type="button"
                              className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                              onClick={() => removeImageHandler2(image2)}
                            >
                              <span className="sr-only">Remove</span>
                              <XIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>
              <div className="mt-6">
                <label
                  htmlFor="discount-code-mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount code
                </label>
                <div className="flex space-x-4 mt-1">
                  <input
                    type="text"
                    id="discount-code-mobile"
                    name="discount-code-mobile"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                  />
                  <button
                    type="submit"
                    className="bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    onClick={() => {
                      if (discount !== '') {
                        Discount();
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">
                    Subtotal{' '}
                    <span className="italic">( {totalarticle} articles )</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {subtotal3} €
                  </dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping </span>
                  </dt>
                  <dd className="text-sm italic font-medium text-gray-900">
                    Calculated in the next step
                  </dd>
                </div>

                {state.cart.discount !== '' ? (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-600">
                      <span>
                        Discount{' '}
                        <span className="italic">
                          ( {state.cart.discount.dis_name} )
                        </span>
                      </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {state.cart.discount.dis_num} %
                    </dd>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>

                  <dd className="text-base font-medium text-gray-900">
                    {total} €
                  </dd>
                </div>
              </dl>

              <button className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                <Link className="  " to="/checkout/shipping">
                  Checkout
                </Link>
              </button>
              <div className="mt-4 text-sm text-center">
                <p>
                  or{' '}
                  <Link
                    to="#"
                    className="text-indigo-600 font-medium hover:text-indigo-500"
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
