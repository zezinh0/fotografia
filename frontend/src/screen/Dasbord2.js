import { Fragment, useState, useReducer, useEffect } from 'react';
import { Dialog, Menu, Transition, Popover } from '@headlessui/react';
import axios from 'axios';

import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
  ScaleIcon,
  UserIcon,
  ThumbUpIcon,
  CheckIcon,
  CubeIcon,
  TruckIcon,
} from '@heroicons/react/outline';
import {
  ChevronRightIcon,
  DotsHorizontalIcon,
  SearchIcon,
  SelectorIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
  ExclamationIcon,
  PaperClipIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/solid';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, current: false },
  { name: 'Events', href: '/project', icon: ViewListIcon, current: true },
  { name: 'Orders', href: '/orders', icon: CurrencyDollarIcon, current: false },
];
const teams = [
  { name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
];
const cards = [
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
  // More items...
];

const pages = [
  { name: 'Orders', href: '/orders', current: false },
  { name: ' Order', href: '#', current: true },
];
const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);
const payments = [
  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
  // More payments...
];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { loading: true };
    case 'FETCH_SUCCESS':
      return { loading: false };
    case 'FETCH_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const items = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  // More items...
];
const eventTypes = {
  processing: { icon: DotsHorizontalIcon, bgColorClass: 'bg-blue-500' },
  created: { icon: CubeIcon, bgColorClass: 'bg-gray-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  sent: { icon: TruckIcon, bgColorClass: 'bg-indigo-500' },
};

const products = [
  {
    id: 1,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  {
    id: 2,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  {
    id: 3,
    name: 'Micro Backpack',
    href: '#',
    price: '$70.00',
    color: 'Moss',
    size: '5L',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
    imageAlt:
      'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
  },
  // More products...
];
export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const params = useParams();
  const { id } = params;
  console.log('O ID');
  console.log(id);
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });
  const navigate = useNavigate();

  const [imagens, setImagens] = useState([]);
  const [encomenda, setEcomenda] = useState({});

  useEffect(() => {
    const fetchData = async (idd) => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/encomenda/getencomenda/${idd}`);

        const result2 = await axios.get(`/api/encomenda/imagens/${idd}`);

        setEcomenda(result.data.data[0]);
        setImagens(result2.data.data);
        console.log(encomenda);
        console.log(imagens);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData(id);
  }, [id]);

  const Processing = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('num', '2');
    const result = await axios.put(`/api/encomenda/update_state`, formData);
    console.log(result);
    window.location.reload(false);
  };
  const Sent = async () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('num', '3');
    const result = await axios.put(`/api/encomenda/update_state`, formData);
    console.log(result);
    window.location.reload(false);
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-8">
                      <h3
                        className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        id="mobile-teams-headline"
                      >
                        Teams
                      </h3>
                      <div
                        className="mt-1 space-y-1"
                        role="group"
                        aria-labelledby="mobile-teams-headline"
                      >
                        {teams.map((team) => (
                          <a
                            key={team.name}
                            href={team.href}
                            className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                          >
                            <span
                              className={classNames(
                                team.bgColorClass,
                                'w-2.5 h-2.5 mr-4 rounded-full'
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{team.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              alt="Workflow"
            />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="px-3 relative inline-block text-left">
              <div>
                <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">
                          Jessy Schwarz
                        </span>
                        <span className="text-gray-500 text-sm truncate">
                          @jessyschwarz
                        </span>
                      </span>
                    </span>
                    <SelectorIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Notifications
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Get desktop app
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Sidebar Search */}
            <div className="px-3 mt-5">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  aria-hidden="true"
                >
                  <SearchIcon
                    className="mr-3 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search"
                />
              </div>
            </div>
            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-200 text-gray-900'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                {/* Secondary navigation */}
                <h3
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="desktop-teams-headline"
                >
                  Teams
                </h3>
                <div
                  className="mt-1 space-y-1"
                  role="group"
                  aria-labelledby="desktop-teams-headline"
                >
                  {teams.map((team) => (
                    <a
                      key={team.name}
                      href={team.href}
                      className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span
                        className={classNames(
                          team.bgColorClass,
                          'w-2.5 h-2.5 mr-4 rounded-full'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{team.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Notifications
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Get desktop app
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Support
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <Link
                        to="/"
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <HomeIcon
                          className="flex-shrink-0 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Home</span>
                      </Link>
                    </div>
                  </li>
                  {pages.map((page) => (
                    <li key={page.name}>
                      <div className="flex items-center">
                        <ChevronRightIcon
                          className="flex-shrink-0 h-5 w-5 text-purple-600"
                          aria-hidden="true"
                        />
                        <Link
                          to={page.href}
                          className={
                            page.current
                              ? 'ml-4 text-sm font-medium text-purple-400'
                              : 'ml-4 text-sm font-medium text-purple-600 hover:text-purple-700'
                          }
                        >
                          {page.name}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* Pinned projects */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-2 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-start-1 lg:col-span-2 py-5">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Order {encomenda.enco_num}
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Customer details and information.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {encomenda.enco_namepro} {encomenda.enco_nameapl}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Phone
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {encomenda.enco_telemovel}
                          </dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {encomenda.enco_email}
                          </dd>
                        </div>
                        {encomenda.enco_morada === '' ? (
                          <div></div>
                        ) : (
                          <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500">
                              Shipping address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              <address className="not-italic">
                                <span className="block">
                                  {encomenda.enco_morada}
                                </span>

                                <span className="block">
                                  {encomenda.enco_postal}
                                  {', '}
                                  {encomenda.enco_cidade}
                                  {', '}
                                  {encomenda.enco_distrito}
                                </span>
                              </address>
                            </dd>
                          </div>
                        )}

                        {/*<div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Shipping address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            <address className="not-italic">
                              <span className="block">Kristin Watson</span>
                              <span className="block">7363 Cynthia Pass</span>
                              <span className="block">Toronto, ON N3Y 4H8</span>
                            </address>
                          </dd>
                        </div>*/}
                      </dl>
                    </div>
                  </div>
                  {encomenda.enco_estado === '1' ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Summary
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Order details and information.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <section
                          aria-labelledby="summary-heading"
                          className="  px-4 sm:px-6 lg:px-0  lg:bg-transparent lg:row-start-1 lg:col-start-2"
                        >
                          <p className="mt-1 max-w-2xl text-center text-md text-red-500">
                            To Seed the Order Details Click on Button
                            'Processing The Order'
                          </p>
                          <div className="mt-6 flex flex-col justify-stretch">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              onClick={() => Processing()}
                            >
                              Processing the Order
                            </button>
                          </div>
                        </section>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg ">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Summary
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Order details and information.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <section
                          aria-labelledby="summary-heading"
                          className="  px-4 sm:px-6 lg:px-0  lg:bg-transparent lg:row-start-1 lg:col-start-2"
                        >
                          <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0 ">
                            <h2
                              id="summary-heading"
                              className="text-lg leading-6 font-medium text-gray-900 "
                            ></h2>

                            <ul
                              role="list"
                              className="text-sm font-medium divide-y divide-gray-900 divide-opacity-10 pt-2"
                            >
                              {imagens.map((image, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start py-6 space-x-4"
                                >
                                  <img
                                    src={image.imag_caminho.slice(53)}
                                    alt="Imagem Encomendada"
                                    className="flex-none w-20 h-20 rounded-md object-center object-cover"
                                  />
                                  <div className="flex-auto space-y-1">
                                    <h3 className="text-gray-900 italic">
                                      {image.imag_name}
                                    </h3>
                                    <p>
                                      {'Size: '}
                                      <span className="italic">
                                        {image.imag_largura} {' x '}
                                        {image.imag_altura}
                                      </span>
                                    </p>
                                    <p>
                                      {'Quantity: '}
                                      <span className="italic">
                                        {image.quantity}
                                      </span>
                                    </p>
                                  </div>
                                  <p className="flex-none text-base font-medium text-gray-900">
                                    {image.imag_price} €
                                  </p>
                                </li>
                              ))}
                            </ul>

                            <dl className="text-sm font-medium space-y-6 border-t border-gray-900 border-opacity-10 pt-6">
                              <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>{encomenda.enco_subtotal} €</dd>
                              </div>

                              <div className="flex items-center justify-between">
                                <dt>
                                  Shipping{' '}
                                  <span className="italic">
                                    ({encomenda.enco_shippingt})
                                  </span>
                                </dt>
                                <dd>{encomenda.enco_shippingp} €</dd>
                              </div>
                              {encomenda.enco_disname === '' ? (
                                <div></div>
                              ) : (
                                <div className="flex items-center justify-between">
                                  <dt>
                                    Discount{' '}
                                    <span className="italic">
                                      ({encomenda.enco_disname})
                                    </span>
                                  </dt>
                                  <dd>{encomenda.enco_disnum} %</dd>
                                </div>
                              )}

                              <div className="flex items-center justify-between border-t border-gray-900 border-opacity-10 text-gray-900v pt-6">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">
                                  {encomenda.enco_total} €
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </section>
                      </div>
                    </div>
                  )}
                </div>

                <section
                  aria-labelledby="timeline-title"
                  className="lg:col-start-3 lg:col-span-1"
                >
                  <div className="bg-white mt-5 px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <h2
                      id="timeline-title"
                      className="text-lg font-medium text-gray-900"
                    >
                      Timeline
                    </h2>

                    {/* Activity Feed */}
                    <div className="mt-6 flow-root">
                      {encomenda.enco_estado === '1' ? (
                        <div>
                          <ul role="list" className="-mb-8">
                            <div className="relative pb-8">
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.created.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.created.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Created{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>
                                    {encomenda.createdAt.slice(0, 10)}{' '}
                                    {encomenda.createdAt.slice(11, 19)}
                                  </time>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      ) : encomenda.enco_estado === '2' ? (
                        <div>
                          <ul role="list" className="-mb-8">
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.created.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.created.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Created{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>
                                    {encomenda.createdAt.slice(0, 10)}{' '}
                                    {encomenda.createdAt.slice(11, 19)}
                                  </time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.processing.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.processing.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Processing the Order{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_processada}</time>
                                </div>
                              </div>
                            </div>
                          </ul>
                          <div className="mt-6 flex flex-col justify-stretch">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() => Sent()}
                            >
                              Order Sent
                            </button>
                          </div>
                        </div>
                      ) : encomenda.enco_estado === '3' ? (
                        <div>
                          <ul role="list" className="-mb-8">
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.created.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.created.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Created{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>
                                    {encomenda.createdAt.slice(0, 10)}{' '}
                                    {encomenda.createdAt.slice(11, 19)}
                                  </time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.processing.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.processing.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Processing the Order{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_processada}</time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.sent.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.sent.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Sent{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_enviada}</time>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      ) : encomenda.enco_estado === '4' ? (
                        <div>
                          <ul role="list" className="-mb-8">
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.created.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.created.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Created{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>
                                    {encomenda.createdAt.slice(0, 10)}{' '}
                                    {encomenda.createdAt.slice(11, 19)}
                                  </time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.processing.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.processing.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Processing the Order{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_processada}</time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.sent.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.sent.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Sent{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_enviada}</time>
                                </div>
                              </div>
                            </div>
                            <div className="relative pb-8">
                              <div className="relative flex space-x-3">
                                <div>
                                  <span
                                    className={classNames(
                                      eventTypes.completed.bgColorClass,
                                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                    )}
                                  >
                                    <eventTypes.completed.icon
                                      className="w-5 h-5 text-white"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                  <div className="pr-4">
                                    <p className="text-sm text-gray-500">
                                      Order Delivered{' '}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-left text-sm whitespace-nowrap text-gray-500 pt-1.5">
                                  <time>{encomenda.enco_entregue}</time>
                                </div>
                              </div>
                            </div>
                          </ul>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
