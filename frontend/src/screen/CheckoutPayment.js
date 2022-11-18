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
import Footer from './Footer';
import Header2 from './Header2';
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from '@headlessui/react';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
  HomeIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { Watermark } from '@hirohe/react-watermark';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import axios from 'axios';
import CheckoutForm2 from '../Components/CheckoutForm2.js';

const stripePromise = loadStripe(
  
);

const pages = [
  { name: 'Shopping Cart', href: '#', current: true },
  //{ name: 'Project Nero', href: '#', current: true },
];
const deliveryMethods = [
  {
    id: 1,
    title: 'Download',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  {
    id: 2,
    title: 'Send Home',
    turnaround: '2–5 business days',
    price: '$16.00',
  },
  {
    id: 2,
    title: 'Download and Send Home',
    turnaround: '2–5 business days',
    price: '$16.00',
  },
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
];
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
];
const steps = [
  { name: 'Cart', href: '/checkout/cart', status: 'completed' },
  { name: 'Shipping', href: '/checkout/shipping', status: 'completed' },
  { name: 'Payment', href: '#', status: 'current' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function CheckoutShipping() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [clientSecret, setClientSecret] = useState('');

  const articles = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const articles2 = state.cart.cartItemsDownload.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const totalarticle = articles + articles2;
  useEffect(() => {
    const fetchData = async () => {
      //dispatch({ type: 'FETCH_REQUEST' });
      let formData = new FormData();
      console.log('ttttttt');

      formData.append('information', state.cart.information.enco_total);

      try {
        const result = await axios.post(
          `/api/encomenda/create-payment-intent`,
          formData
        );

        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log('iiiiiiiiiiiiiiiiiiiiiiii');
        console.log(result);

        console.log('i22222222222222222222');
        console.log(result.data.clientSecret);
        setClientSecret(result.data.clientSecret);
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  console.log(
    state.cart.cartItems.length > 0 || state.cart.cartItemsDownload.length > 0
  );

  return (
    <div>
      <Header2 />
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-8 pb-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <nav aria-label="Progress" className="hidden sm:block">
              <ol role="list" className="flex space-x-4">
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

              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {state.cart.cartItems.map((image, productIdx) => (
                  <li key={image.id} className="flex py-6">
                    <div className="flex-shrink-0">
                      <Watermark show="false" text="Mark" opacity="0.5">
                        <img
                          src={image.esc_caminho}
                          alt="Imagem escolhida"
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-24 sm:h-24"
                        />
                      </Watermark>
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            {image.esc_largura} cm x {image.esc_altura} cm
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {' '}
                            {image.esc_price} €
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-gray-900">
                          Quantity: {image.quantity}
                        </p>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between"></div>
                    </div>
                  </li>
                ))}
                {state.cart.cartItemsDownload.map((image, productIdx) => (
                  <li key={productIdx} className="flex py-6">
                    <div className="flex-shrink-0">
                      <Watermark show="false" text="Mark" opacity="0.5">
                        <img
                          src={image.esc_caminho}
                          alt="Imagem escolhida"
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-24 sm:h-24"
                        />
                      </Watermark>
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">Download</h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {' '}
                            {image.esc_price} €
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-gray-900">
                          Quantity: {image.quantity}
                        </p>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between"></div>
                    </div>
                  </li>
                ))}
              </ul>

              {state.cart.information.enco_morada !== '' ? (
                <dl className="grid grid-cols-1 gap-x-6 text-sm mt-4 md:grid-cols-2">
                  <div>
                    <dt className="font-medium text-md text-gray-900">
                      Shipping address
                    </dt>
                    <dd className="mt-2 text-gray-700">
                      <address className=" text-sm italic">
                        <span className="block"></span>
                        <span className="block">
                          {state.cart.information.enco_morada}
                        </span>
                        <span className="block">
                          {state.cart.information.enco_cidade},{' '}
                          {state.cart.information.enco_distrito},{' '}
                          {state.cart.information.enco_postal}
                        </span>
                      </address>
                    </dd>
                  </div>
                  <div>
                    <dt className="mt-4 md:mt-0 font-medium text-md text-gray-900">
                      Contact Information
                    </dt>
                    <dd className="mt-2 text-gray-700">
                      <address className="text-sm italic">
                        <span className="block">
                          {state.cart.information.enco_namepro}{' '}
                          {state.cart.information.enco_nameapl}
                        </span>
                        <span className="block">
                          {state.cart.information.enco_email}
                        </span>
                        <span className="block">
                          {state.cart.information.enco_telemovel}
                        </span>
                      </address>
                    </dd>
                  </div>
                </dl>
              ) : (
                <dl className="grid grid-cols-1 gap-x-6 text-sm mt-4 md:grid-cols-2">
                  <div>
                    <dt className="font-medium text-md text-gray-900">
                      Contact Information
                    </dt>
                    <dd className="mt-2 text-gray-700">
                      <address className="text-sm italic">
                        <span className="block">
                          {state.cart.information.enco_namepro}{' '}
                          {state.cart.information.enco_nameapl}
                        </span>
                        <span className="block">
                          {state.cart.information.enco_email}
                        </span>
                        <span className="block">
                          {state.cart.information.enco_telemovel}
                        </span>
                      </address>
                    </dd>
                  </div>
                </dl>
              )}
            </section>

            {/* Order summary */}
            <section className="mt-8 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-900">
                    Subtotal{' '}
                    <span className="italic">( {totalarticle} articles )</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {state.cart.information.enco_subtotal} €
                  </dd>
                </div>

                {state.cart.cartItems.metodo !== '' ? (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-900">
                      <span>
                        Shipping{' '}
                        <span className="italic">
                          ( {state.cart.metodo.title} )
                        </span>
                      </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {state.cart.metodo.price} €
                    </dd>
                  </div>
                ) : (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-600">
                      <span>Shipping </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">0 €</dd>
                  </div>
                )}
                {state.cart.discount !== '' ? (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm text-gray-900">
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
                ) : null}

                <div className="border-t  border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-md font-medium text-gray-900">
                    Order Total
                  </dt>

                  <dd className="text-base font-medium text-gray-900">
                    {state.cart.information.enco_total} €
                  </dd>
                </div>
              </dl>
              {(state.cart.cartItems.length > 0 ||
                state.cart.cartItemsDownload.length > 0) &&
              state.cart.grupo !== '' &&
              state.cart.metodo !== '' &&
              state.cart.information !== '' ? (
                <div className="border-t  border-gray-200 mt-4">
                  <div className="mt-4">
                    {clientSecret && stripePromise && (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <CheckoutForm2 clientSecret={{ clientSecret }} />
                      </Elements>
                    )}
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
