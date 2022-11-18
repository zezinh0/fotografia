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
import Footer from './Footer';
import Header2 from './Header2';
import { Store } from '../Store';
import { useNavigate, Link, Navigate } from 'react-router-dom';
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
import axios from 'axios';
import Header from './Header';
const pages = [
  { name: 'Shopping Cart', href: '#', current: true },
  //{ name: 'Project Nero', href: '#', current: true },
];
const deliveryMethods = {
  id: '1',
  title: 'Free',
  turnaround: '',
  price: 0,
};

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
const steps = [
  { name: 'Cart', href: '/checkout/cart', status: 'completed' },
  { name: 'Shipping', href: '/checkout/shipping', status: 'current' },
  { name: 'Payment', href: '#', status: 'upcoming' },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function CheckoutShipping() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
  const navigate = useNavigate();

  const [enco_namepro, setEnco_namepro] = useState('');
  const [enco_nameapl, setEnco_nameapl] = useState('');
  const [enco_email, setEnco_email] = useState('');
  const [enco_telemovel, setEnco_telemovel] = useState('');
  const [enco_morada, setEnco_morada] = useState('');
  const [enco_pais, setEnco_pais] = useState('');
  const [enco_postal, setEnco_postal] = useState('');
  const [enco_cidade, setEnco_cidade] = useState('');
  const [enco_distrito, setEnco_distrito] = useState('');
  const [enco_nif, setEnco_nif] = useState('');
  const [enco_info, setEnco_info] = useState('');
  const [deliveries, setDeliveries] = useState([]);

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
  const delivery2 = selectedDeliveryMethod.price
    ? selectedDeliveryMethod.price
    : 0;
  const total = (
    subtotal3 -
    subtotal3 * (discount2 / 100) +
    Number(delivery2)
  ).toFixed(2);
  const articles = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const articles2 = state.cart.cartItemsDownload.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const totalarticle = articles + articles2;

  const deliveryMethods = state.cart.cartItemsDownload[0]
    ? {
        id: state.cart.cartItemsDownload[0].esc_id_tamanho,
        title: 'Free',
        discription: '',
        price: 0,
      }
    : { id: 0, title: 'Free', discription: '', price: 0 };

  useEffect(() => {
    ctxDispatch({ type: 'METODO_ADD', payload: '' });

    const fetchData = async () => {
      //dispatch({ type: 'FETCH_REQUEST' });
      console.log('ESTOU AQUI');

      try {
        const result = await axios.get(
          `/api/grupos/grupo/delivery/${state.cart.grupo.grupo_id}`
        );
        console.log('AQUIIUUIUIUI');
        console.log(result);
        setDeliveries(result.data.data);
        // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        // dispatch({ type: 'FETCH_FAIL', payload: error.message });

        console.log('ERRRRRRO');
      }
      // dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    };
    fetchData();
  }, []);
  console.log('IUIUIUUI');
  console.log(selectedDeliveryMethod);

  const Payment = () => {
    ctxDispatch({
      type: 'INFORMATION_ADD',
      payload: {
        enco_namepro: enco_namepro,
        enco_nameapl: enco_nameapl,
        enco_email: enco_email,
        enco_telemovel: enco_telemovel,
        enco_morada: enco_morada,
        enco_pais: enco_pais,
        enco_postal: enco_postal,
        enco_distrito: enco_distrito,
        enco_cidade: enco_cidade,
        enco_nif: enco_nif,
        enco_info: enco_info,
        enco_subtotal: subtotal3,
        enco_total: total,
      },
    });

    ctxDispatch({ type: 'METODO_ADD', payload: selectedDeliveryMethod });
    navigate('/checkout/payment');
  };
  console.log(state.cart.cartItems.length);
  return (
    <div>
      <Header2></Header2>
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
            <p className="sm:hidden">Step 2 of 4</p>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7 ">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              {state.cart.cartItems.length > 0 ? (
                <div>
                  <div className=" border-t border-gray-200 pt-10 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 shadow rounded">
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}
                    >
                      <RadioGroup.Label className="text-lg font-medium text-gray-900">
                        Delivery method
                      </RadioGroup.Label>

                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {deliveries.map((delivery, idx) => (
                          <RadioGroup.Option
                            key={idx}
                            value={delivery}
                            className={({ checked, active }) =>
                              classNames(
                                checked
                                  ? 'border-transparent'
                                  : 'border-gray-300',
                                active ? 'ring-2 ring-indigo-500' : '',
                                'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                              )
                            }
                          >
                            {({ checked, active }) => (
                              <>
                                <div className="flex-1 flex">
                                  <div className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className="block text-sm font-medium text-gray-900"
                                    >
                                      {delivery.title}
                                    </RadioGroup.Label>

                                    <RadioGroup.Description
                                      as="span"
                                      className="mt-6 text-sm font-medium text-gray-900"
                                    >
                                      {delivery.price} €
                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked ? (
                                  <CheckCircleIcon
                                    className="h-5 w-5 text-indigo-600"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked
                                      ? 'border-indigo-500'
                                      : 'border-transparent',
                                    'absolute -inset-px rounded-lg pointer-events-none'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {selectedDeliveryMethod === '' ? null : (
                    <div>
                      <div className="mt-10 border-t border-gray-200 pt-10 px-4 py-6 sm:p-6 lg:p-8 lg:mt-10 shadow rounded">
                        <h2 className="text-lg font-medium text-gray-900">
                          Contact information
                        </h2>
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mt-4">
                          <div>
                            <label
                              htmlFor="first-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              First name<span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                autoComplete="given-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_namepro}
                                onChange={(e) =>
                                  setEnco_namepro(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Last name<span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_nameapl}
                                onChange={(e) =>
                                  setEnco_nameapl(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2 ">
                            <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email address
                              <span className=" text-red-500">*</span>
                            </label>

                            <div className="mt-1">
                              <input
                                type="email"
                                id="email-address"
                                name="email-address"
                                autoComplete="email"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_email}
                                onChange={(e) => setEnco_email(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone<span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_telemovel}
                                onChange={(e) =>
                                  setEnco_telemovel(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 border-t border-gray-200 pt-10 px-4 py-6 sm:p-6 lg:p-8 lg:mt-10 shadow rounded">
                        <h2 className="text-lg font-medium text-gray-900">
                          Shipping information
                        </h2>

                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                          {/*<div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>*/}
                          {/*<div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="street-address"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>*/}

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="apartment"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Apartment, suite, etc.
                              <span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="apartment"
                                id="apartment"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_morada}
                                onChange={(e) => setEnco_morada(e.target.value)}
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City<span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_cidade}
                                onChange={(e) => setEnco_cidade(e.target.value)}
                              />
                            </div>
                          </div>
                          {/*<div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>*/}

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                              <span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_distrito}
                                onChange={(e) =>
                                  setEnco_distrito(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                              <span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={enco_postal}
                                onChange={(e) => setEnco_postal(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className=" border-t border-gray-200 pt-10 px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 shadow rounded">
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}
                    >
                      <RadioGroup.Label className="text-lg font-medium text-gray-900">
                        Delivery method
                      </RadioGroup.Label>

                      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <RadioGroup.Option
                          key={deliveryMethods.id}
                          value={deliveryMethods}
                          className={({ checked, active }) =>
                            classNames(
                              checked
                                ? 'border-transparent'
                                : 'border-gray-300',
                              active ? 'ring-2 ring-indigo-500' : '',
                              'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <div className="flex-1 flex">
                                <div className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    Free
                                  </RadioGroup.Label>

                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-6 text-sm font-medium text-gray-900"
                                  >
                                    0 €
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked ? (
                                <CheckCircleIcon
                                  className="h-5 w-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                              ) : null}
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked
                                    ? 'border-indigo-500'
                                    : 'border-transparent',
                                  'absolute -inset-px rounded-lg pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      </div>
                    </RadioGroup>
                  </div>

                  {selectedDeliveryMethod === '' ? null : (
                    <div className="mt-10 border-t border-gray-200 pt-10 px-4 py-6 sm:p-6 lg:p-8 lg:mt-10 shadow rounded">
                      <h2 className="text-lg font-medium text-gray-900">
                        Contact information
                      </h2>
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4 mt-4">
                        <div>
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name<span className=" text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="first-name"
                              name="first-name"
                              autoComplete="given-name"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={enco_namepro}
                              onChange={(e) => setEnco_namepro(e.target.value)}
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name<span className=" text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="last-name"
                              name="last-name"
                              autoComplete="family-name"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={enco_nameapl}
                              onChange={(e) => setEnco_nameapl(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2 ">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                            <span className=" text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="email"
                              id="email-address"
                              name="email-address"
                              autoComplete="email"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={enco_email}
                              onChange={(e) => setEnco_email(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone<span className=" text-red-500">*</span>
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              autoComplete="tel"
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={enco_telemovel}
                              onChange={(e) =>
                                setEnco_telemovel(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

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
                {selectedDeliveryMethod !== '' ? (
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm text-gray-900">
                      <span>
                        Shipping{' '}
                        <span className="italic">
                          ( {selectedDeliveryMethod.title} )
                        </span>
                      </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {selectedDeliveryMethod.price} €
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
                    Order Total
                  </dt>
                  {state.cart.discount !== '' ? (
                    selectedDeliveryMethod !== '' ? (
                      <dd className="text-base font-medium text-gray-900">
                        {total} €
                      </dd>
                    ) : (
                      <dd className="text-base font-medium text-gray-900">
                        {total} €
                      </dd>
                    )
                  ) : selectedDeliveryMethod !== '' ? (
                    <dd className="text-base font-medium text-gray-900">
                      {total} €
                    </dd>
                  ) : (
                    <dd className="text-base font-medium text-gray-900">
                      {total} €
                    </dd>
                  )}
                </div>
              </dl>
              {selectedDeliveryMethod !== '' ? (
                state.cart.cartItemsDownload.length > 0 &&
                state.cart.cartItems.length === 0 ? (
                  enco_namepro !== '' &&
                  enco_nameapl !== '' &&
                  enco_email !== '' &&
                  enco_telemovel !== '' ? (
                    <button
                      onClick={() => {
                        Payment();
                      }}
                      className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Payment
                    </button>
                  ) : (
                    <div className="mt-6 w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white   ">
                      <button type="submit" className="" disabled>
                        Fill in all Mandatory Fields
                      </button>
                    </div>
                  )
                ) : enco_namepro !== '' &&
                  enco_nameapl !== '' &&
                  enco_email !== '' &&
                  enco_telemovel !== '' &&
                  enco_morada !== '' &&
                  enco_cidade !== '' &&
                  enco_distrito !== '' &&
                  enco_postal !== '' ? (
                  <button
                    onClick={() => {
                      Payment();
                    }}
                    className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Payment
                  </button>
                ) : (
                  <div className="mt-6 w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white   ">
                    <button type="submit" className="" disabled>
                      Fill in all Mandatory Fields
                    </button>
                  </div>
                )
              ) : (
                <div className="mt-6 w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base text-center font-medium text-white   ">
                  <button type="submit" className="" disabled>
                    Choose a Delivery Method
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
