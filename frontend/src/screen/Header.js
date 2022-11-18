import { Fragment, useContext, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import { Watermark } from '@hirohe/react-watermark';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Store } from '../Store';
import { useNavigate, Link } from 'react-router-dom';
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
    name: 'Throwback Hip Bag',
    href: '#',
    color: '210 (cm) x 210 (cm)',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '210 (cm) x 210 (cm)',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '210 (cm) x 210 (cm)',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 4,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '210 (cm) x 210 (cm)',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 5,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: '210 (cm) x 210 (cm)',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
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

  const subtotal = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity * objectt.esc_price,
    0
  );
  const subitem = state.cart.cartItems.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const subitem2 = state.cart.cartItemsDownload.reduce(
    (partialSum, objectt) => partialSum + objectt.quantity,
    0
  );
  const totalitems = subitem + subitem2;
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
  const removeImageHandler2 = (image) => {
    console.log('tatatata');
    console.log(image);
    ctxDispatch({ type: 'CART_REMOVE_ITEM_DOWNLOAD', payload: image });
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
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-xs">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen2(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {state.cart.cartItems.map((image, idx) => (
                              <li key={idx} className="flex py-4">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Watermark text="Mark" opacity="0.5">
                                    <img
                                      src={image.esc_caminho}
                                      alt="Imagem Escolhida"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </Watermark>
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900"></div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Sent Home: {image.esc_largura} (cm) x{' '}
                                      {image.esc_altura} (cm)
                                    </p>
                                  </div>

                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {image.quantity}
                                    </p>

                                    <div className="flex flex-1 items-end pl-4">
                                      <button
                                        type="button"
                                        className="font-medium text-red-500 hover:text-red-900"
                                        onClick={() => {
                                          removeImageHandler(image);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                            {state.cart.cartItemsDownload.map((image2, idx) => (
                              <li key={idx} className="flex py-4">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Watermark text="Mark" opacity="0.5">
                                    <img
                                      src={image2.esc_caminho}
                                      alt="Imagem Escolhida"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </Watermark>
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900"></div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      Download
                                    </p>
                                  </div>

                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {image2.quantity}
                                    </p>

                                    <div className="flex flex-1 items-end pl-4">
                                      <button
                                        type="button"
                                        className="font-medium text-red-500 hover:text-red-900"
                                        onClick={() => {
                                          removeImageHandler2(image2);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="mt-1">
                        <Link
                          to="/checkout/cart"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => setOpen2(false)}
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen2(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*------------HEADER-----------------------------*/}
      <div className="bg-white">
        {/* Mobile menu */}

        {/*----------------HEADER--------------------------*/}

        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-indigo-500"
          >
            <div className="">
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
                    className="p-2 text-indigo-500 hover:text-indigo-900 lg:ml-4"
                    onClick={() => {
                      navigate('/signin');
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
                        className="flex-shrink-0 h-6 w-6 text-indigo-500 group-hover:text-indigo-900"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-indigo-500 group-hover:text-indigo-900">
                        {totalitems}
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
