import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt:
            'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
          imageAlt:
            'Model wearing minimalist watch with black wristband and white watch face.',
        },
      ],
      sections: [
        [
          {
            id: 'shoes',
            name: 'Shoes & Accessories',
            items: [
              { name: 'Sneakers', href: '#' },
              { name: 'Boots', href: '#' },
              { name: 'Flats', href: '#' },
              { name: 'Sandals', href: '#' },
              { name: 'Heels', href: '#' },
              { name: 'Socks', href: '#' },
            ],
          },
          {
            id: 'collection',
            name: 'Shop Collection',
            items: [
              { name: 'Everything', href: '#' },
              { name: 'Core', href: '#' },
              { name: 'New Arrivals', href: '#' },
              { name: 'Sale', href: '#' },
              { name: 'Accessories', href: '#' },
            ],
          },
        ],
        [
          {
            id: 'clothing',
            name: 'All Clothing',
            items: [
              { name: 'Basic Tees', href: '#' },
              { name: 'Artwork Tees', href: '#' },
              { name: 'Tops', href: '#' },
              { name: 'Bottoms', href: '#' },
              { name: 'Swimwear', href: '#' },
              { name: 'Underwear', href: '#' },
            ],
          },
          {
            id: 'accessories',
            name: 'All Accessories',
            items: [
              { name: 'Watches', href: '#' },
              { name: 'Wallets', href: '#' },
              { name: 'Bags', href: '#' },
              { name: 'Sunglasses', href: '#' },
              { name: 'Hats', href: '#' },
              { name: 'Belts', href: '#' },
            ],
          },
        ],
        [
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Full Nelson', href: '#' },
              { name: 'My Way', href: '#' },
              { name: 'Re-Arranged', href: '#' },
              { name: 'Counterfeit', href: '#' },
              { name: 'Significant Other', href: '#' },
            ],
          },
        ],
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'Accessories',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg',
          imageAlt:
            'Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.',
        },
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt:
            'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        [
          {
            id: 'shoes',
            name: 'Shoes & Accessories',
            items: [
              { name: 'Sneakers', href: '#' },
              { name: 'Boots', href: '#' },
              { name: 'Sandals', href: '#' },
              { name: 'Socks', href: '#' },
            ],
          },
          {
            id: 'collection',
            name: 'Shop Collection',
            items: [
              { name: 'Everything', href: '#' },
              { name: 'Core', href: '#' },
              { name: 'New Arrivals', href: '#' },
              { name: 'Sale', href: '#' },
            ],
          },
        ],
        [
          {
            id: 'clothing',
            name: 'All Clothing',
            items: [
              { name: 'Basic Tees', href: '#' },
              { name: 'Artwork Tees', href: '#' },
              { name: 'Pants', href: '#' },
              { name: 'Hoodies', href: '#' },
              { name: 'Swimsuits', href: '#' },
            ],
          },
          {
            id: 'accessories',
            name: 'All Accessories',
            items: [
              { name: 'Watches', href: '#' },
              { name: 'Wallets', href: '#' },
              { name: 'Bags', href: '#' },
              { name: 'Sunglasses', href: '#' },
              { name: 'Hats', href: '#' },
              { name: 'Belts', href: '#' },
            ],
          },
        ],
        [
          {
            id: 'brands',
            name: 'Brands',
            items: [
              { name: 'Re-Arranged', href: '#' },
              { name: 'Counterfeit', href: '#' },
              { name: 'Full Nelson', href: '#' },
              { name: 'My Way', href: '#' },
            ],
          },
        ],
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

const products = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    href: '#',
    color: 'White and black',
    price: '$140.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-03.jpg',
    imageAlt:
      'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  // More products...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    state.cart.metodo === ''
      ? deliveryMethods[0]
      : deliveryMethods[state.cart.metodo.id - 1]
  );

  console.log(state);

  useEffect(() => {
    ctxDispatch({
      type: 'METODO_ADD',

      payload: selectedDeliveryMethod,
    });
  }, [selectedDeliveryMethod, ctxDispatch]);

  const subtotal = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );

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

  const removeImageHandler = (image) => {
    console.log('tatatata');
    console.log(image);
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: image });
  };
  return (
    <div>
      {/*----------------CART---------------------------*/}
      <Transition.Root show={open2} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen2}
        >
          <div
            className="flex min-h-screen text-center sm:block sm:px-6 lg:px-8"
            style={{ fontSize: 0 }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-500 sm:bg-opacity-75 sm:transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-105"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-105"
            >
              <div className="flex text-base text-left transform transition w-full sm:inline-block max-w-3xl sm:my-8 sm:align-middle">
                <form className="w-full relative flex flex-col bg-white pt-6 pb-8 overflow-hidden sm:pb-6 sm:rounded-lg lg:py-8">
                  <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setOpen2(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" className="sr-only">
                      Items in your shopping cart
                    </h2>

                    <ul
                      role="list"
                      className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8"
                    >
                      {state.cart.cartItems.map((image, i) => (
                        <li
                          key={i}
                          className="py-8 flex text-sm sm:items-center"
                        >
                          <img
                            src={image.esc_caminho}
                            alt="Imagem Escolhida"
                            className="flex-none w-24 h-24 rounded-lg border border-gray-200 sm:w-32 sm:h-32"
                          />
                          <div className="ml-4 flex-auto grid gap-y-3 gap-x-5 grid-rows-1 grid-cols-1 items-start sm:ml-6 sm:flex sm:gap-0 sm:items-center">
                            <div className="flex-auto row-end-1 sm:pr-6">
                              <h3 className="font-medium text-gray-900">
                                {image.esc_largura +
                                  ' cm X ' +
                                  image.esc_altura +
                                  ' cm'}
                              </h3>
                              {/*<h3 className="font-medium text-gray-900">
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className="mt-1 text-gray-500">
                                {product.color}
                              </p>*/}
                            </div>
                            <p className="row-end-2 row-span-2 font-medium text-gray-900 sm:ml-6 sm:order-1 sm:flex-none sm:w-1/3 sm:text-right">
                              {image.esc_price}€
                            </p>
                            <div className="flex items-center sm:flex-none sm:block sm:text-center">
                              {/*<label
                                htmlFor={`quantity-${productIdx}`}
                                className="sr-only"
                              >
                                Quantity, {product.name}
                              </label>
                              <select
                                id={`quantity-${productIdx}`}
                                name={`quantity-${productIdx}`}
                                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>*/}

                              <div>
                                <div className="flex flex-row  rounded-lg relative bg-transparent mt-1">
                                  <button
                                    onClick={() =>
                                      updateCartHandler(
                                        image,
                                        image.quantity - 1
                                      )
                                    }
                                    data-action="decrement"
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
                                    onClick={() =>
                                      updateCartHandler(
                                        image,
                                        image.quantity + 1
                                      )
                                    }
                                    data-action="increment"
                                    className="ml-2"
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

                              <button
                                type="button"
                                className="ml-4 font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-2"
                                onClick={() => removeImageHandler(image)}
                              >
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {state.cart.cartItems.length > 0 ? (
                      <div className="px-4 sm:px-6 lg:px-8 mt-10 border-t border-gray-200 pt-10">
                        <RadioGroup
                          value={selectedDeliveryMethod}
                          onChange={setSelectedDeliveryMethod}
                        >
                          <RadioGroup.Label className="text-lg font-medium text-gray-900">
                            Delivery method
                          </RadioGroup.Label>

                          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            {deliveryMethods.map((deliveryMethod) => (
                              <RadioGroup.Option
                                key={deliveryMethod.id}
                                value={deliveryMethod}
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
                                          {deliveryMethod.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as="span"
                                          className="mt-1 flex items-center text-sm text-gray-500"
                                        >
                                          {deliveryMethod.turnaround}
                                        </RadioGroup.Description>
                                        <RadioGroup.Description
                                          as="span"
                                          className="mt-6 text-sm font-medium text-gray-900"
                                        >
                                          Preço Total + {deliveryMethod.price} €
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
                    ) : (
                      <div></div>
                    )}
                  </section>

                  <section
                    aria-labelledby="summary-heading"
                    className="mt-10 sm:px-6 lg:px-8"
                  >
                    {state.cart.cartItems.length > 0 ? (
                      <div className="bg-gray-50 p-6 sm:p-8 sm:rounded-lg">
                        <h2 id="summary-heading" className="sr-only">
                          Order summary
                        </h2>

                        <div className="flow-root">
                          <dl className="-my-4 text-sm divide-y divide-gray-200">
                            {/*<div className="py-4 flex items-center justify-between">
                              <dt className="text-gray-600">Subtotal</dt>
                              <dd className="font-medium text-gray-900">
                                ${subtotal}
                              </dd>
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

                            <div className="py-4 flex items-center justify-between">
                              <dt className="text-base font-medium text-gray-900">
                                Order total
                              </dt>
                              <dd className="text-base font-medium text-gray-900">
                                $
                                {subtotal > 0
                                  ? subtotal + selectedDeliveryMethod.price
                                  : 0}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-lg font-medium text-red-600">
                          O seu carrinho de compras está vazio!{' '}
                        </h1>
                      </div>
                    )}
                  </section>

                  <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
                    {subtotal > 0 ? (
                      <button
                        type="submit"
                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        onClick={() => {
                          navigate('/checkout');
                        }}
                      >
                        Continue to Payment
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/*------------HEADER-----------------------------*/}
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="pt-10 pb-8 px-4 space-y-10"
                      >
                        <div className="space-y-4">
                          {category.featured.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden"
                            >
                              <img
                                src={item.imageSrc}
                                alt={item.imageAlt}
                                className="object-center object-cover group-hover:opacity-75"
                              />
                              <div className="flex flex-col justify-end">
                                <div className="p-4 bg-white bg-opacity-60 text-base sm:text-sm">
                                  <a
                                    href={item.href}
                                    className="font-medium text-gray-900"
                                  >
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                  <p
                                    aria-hidden="true"
                                    className="mt-0.5 text-gray-700 sm:mt-1"
                                  >
                                    Shop now
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((column, columnIdx) => (
                          <div key={columnIdx} className="space-y-10">
                            {column.map((section) => (
                              <div key={section.name}>
                                <p
                                  id={`${category.id}-${section.id}-heading-mobile`}
                                  className="font-medium text-gray-900"
                                >
                                  {section.name}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                  className="mt-6 flex flex-col space-y-6"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-2 p-2 block text-gray-500"
                                      >
                                        {item.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 p-2 block font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <a href="#" className="-m-2 p-2 flex items-center">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        {/*----------------HEADER--------------------------*/}

        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="h-16 flex items-center justify-between">
                {/*<div className="flex-1 flex items-center lg:hidden">
                <button
                  type="button"
                  className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <a
                  href="#"
                  className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" />
                </a>
              </div>*/}

                {/* Flyout menus */}
                {/*<Popover.Group className="hidden lg:flex-1 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'text-indigo-600'
                                  : 'text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center justify-center transition-colors ease-out duration-200 text-sm font-medium'
                              )}
                            >
                              {category.name}
                              <span
                                className={classNames(
                                  open ? 'bg-indigo-600' : '',
                                  'absolute bottom-0 inset-x-0 h-0.5 transition-colors ease-out duration-200 sm:mt-5 sm:transform sm:translate-y-px'
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0">
                              
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="grid grid-rows-1 grid-cols-2 gap-8 text-sm">
                                      {category.featured.map(
                                        (item, itemIdx) => (
                                          <div
                                            key={item.name}
                                            className={classNames(
                                              itemIdx === 0
                                                ? 'col-span-2 aspect-w-2'
                                                : '',
                                              'group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden'
                                            )}
                                          >
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover group-hover:opacity-75"
                                            />
                                            <div className="flex flex-col justify-end">
                                              <div className="p-4 bg-white bg-opacity-60 text-sm">
                                                <a
                                                  href={item.href}
                                                  className="font-medium text-gray-900"
                                                >
                                                  <span
                                                    className="absolute inset-0"
                                                    aria-hidden="true"
                                                  />
                                                  {item.name}
                                                </a>
                                                <p
                                                  aria-hidden="true"
                                                  className="mt-0.5 text-gray-700 sm:mt-1"
                                                >
                                                  Shop now
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                    <div className="grid grid-cols-3 gap-y-10 gap-x-8 text-sm text-gray-500">
                                      {category.sections.map(
                                        (column, columnIdx) => (
                                          <div
                                            key={columnIdx}
                                            className="space-y-10"
                                          >
                                            {column.map((section) => (
                                              <div key={section.name}>
                                                <p
                                                  id={`${category.id}-${section.id}-heading`}
                                                  className="font-medium text-gray-900"
                                                >
                                                  {section.name}
                                                </p>
                                                <ul
                                                  role="list"
                                                  aria-labelledby={`${category.id}-${section.id}-heading`}
                                                  className="mt-4 space-y-4"
                                                >
                                                  {section.items.map((item) => (
                                                    <li
                                                      key={item.name}
                                                      className="flex"
                                                    >
                                                      <a
                                                        href={item.href}
                                                        className="hover:text-gray-800"
                                                      >
                                                        {item.name}
                                                      </a>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </div>
                                            ))}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>*/}

                {/* Logo */}
                <a href="#" className="flex">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>

                <div className="flex-1 flex items-center justify-end">
                  {/*<a
                  href="#"
                  className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center"
                >
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-sm font-medium">CAD</span>
                  <span className="sr-only">, change currency</span>
                </a>*/}

                  {/* Search 
                <a
                  href="#"
                  className="hidden ml-6 p-2 text-gray-400 hover:text-gray-500 lg:block"
                >
                  <span className="sr-only">Search</span>
                  <SearchIcon className="w-6 h-6" aria-hidden="true" />
                </a>
                
                */}

                  {/* Account */}
                  <button
                    className="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
                    onClick={() => {
                      navigate('/singinn');
                    }}
                  >
                    <span className="sr-only">Account</span>
                    <UserIcon className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <button
                      className="group -m-2 p-2 flex items-center"
                      onClick={() => setOpen2(true)}
                    >
                      <ShoppingBagIcon
                        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {state.cart.cartItems.reduce(
                          (partialSum, objectt) =>
                            partialSum + objectt.quantity,
                          0
                        )}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
