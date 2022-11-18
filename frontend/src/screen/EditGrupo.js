import { Fragment, useState, useReducer, useEffect } from 'react';
import { Dialog, Menu, Transition, Switch } from '@headlessui/react';
import axios from 'axios';

import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
  ScaleIcon,
} from '@heroicons/react/outline';
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  SearchIcon,
  SelectorIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
  ExclamationIcon,
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
  { name: 'Events', href: '/project', current: false },
  { name: ' Event', href: '#', current: true },
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
  const [files, setFile] = useState([]);

  const [imagens, setImagens] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [grupo_name, setGrupo_Name] = useState('');
  const [tamanhos, setTamanhos] = useState([]);
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [price, setPrice] = useState('');
  const [codigo, setCodigo] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [_idd, setId] = useState('');
  const [image_name, setImage_Name] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [title_delivery, setTitle_Delivery] = useState('');
  const [price_delivery, setPrice_Delivery] = useState('');
  const [name_discount, setName_Discount] = useState('');
  const [number_discount, setNumber_Discount] = useState('');
  const [download, setDownload] = useState(false);
  const [download_price, setDownload_Price] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/grupos/grupo/${id}`);

        setGrupo_Name(result.data.data[0].grupo_name);
        setTamanhos(result.data.data[0].grupo_medidas);
        setDeliveries(result.data.data[0].grupo_delivery);
        setDiscounts(result.data.data[0].grupo_discount);
        setDownload_Price(result.data.data[0].grupo_download_price);
        setDownload(result.data.data[0].grupo_download);
        console.log(grupo_name);
        console.log(deliveries);
        console.log(discounts);
        console.log(tamanhos);
        console.log(result);
        const imgs = await axios.get(`/api/imagens/imagens/${id}`);
        setImagens(imgs.data);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, [id]);

  const handleFile = (e) => {
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setFile((prevfiles) => [...prevfiles, file[i]]);
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
    setImage_Name('');
    setOpen2(false);
  };
  const removeImageId = async (idd) => {
    try {
      const imgs = await axios.delete(`/api/imagens/deleteimagensid/${idd}`);

      dispatch({ type: 'FETCH_SUCCESS', payload: imgs.data });
      setImage_Name('');
      setOpen2(false);
      window.location.reload(false);
    } catch (error) {
      setImage_Name('');
      setOpen2(false);
      dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
  };
  const removeTamanho = (i) => {
    setTamanhos(tamanhos.filter((x) => x.id !== i));
  };
  const removeDelivery = (i) => {
    setDeliveries(deliveries.filter((x) => x.id !== i));
  };

  const removeDiscount = (i) => {
    setDiscounts(discounts.filter((x) => x.id !== i));
  };

  const onSubmit = async () => {
    console.log('Entrei');
    dispatch({ type: 'FETCH_REQUEST' });

    var grupo = new FormData();

    let send = JSON.stringify({
      grupo_name: grupo_name,
      grupo_discount: discounts,
      grupo_delivery: deliveries,
      grupo_medidas: tamanhos,
    });

    grupo.append('send', send);

    try {
      const res = await axios.put(`/api/grupos/update/${id}`, grupo);

      // Clear percentage

      console.log(res);
      dispatch({ type: 'FETCH_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
    window.location.reload(false);
  };

  const onSubmit2 = async () => {
    try {
      if (files.length > 0) {
        var formData = new FormData();
        formData.append('grupo', id);
        Object.values(files).forEach((file) => {
          formData.append('uploadImages', file);
        });
        const result = await axios.post('/api/imagens/upload', formData);
        console.log('Fotoss criadas');
      }

      // Clear percentage

      dispatch({ type: 'FETCH_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error.message });
    }
    navigate(`/editgrupo/${id}`);
  };

  const Tamanhos = () => {
    const tam = {
      largura: largura,
      altura: altura,
      price: price,
      id: Date.now(),
    };

    setTamanhos((prevfiles) => [...prevfiles, tam]);
    setLargura('');
    setAltura('');
    setPrice('');
    setOpen(false);
  };

  const Deliveries = () => {
    console.log('Entrei');
    console.log(deliveries);
    let deliv = deliveries;
    deliv.push({
      id: Date.now(),
      title: title_delivery,
      price: price_delivery,
    });

    console.log(deliveries);
    setDeliveries(deliv);
    setTitle_Delivery('');
    setPrice_Delivery('');

    setOpen2(false);
  };
  const Discounts = () => {
    let disc = discounts;
    disc.push({ id: Date.now(), name: name_discount, number: number_discount });
    setDiscounts(disc);
    setName_Discount('');
    setNumber_Discount('');

    setOpen3(false);
  };

  const Apagar = () => {
    setLargura('');
    setAltura('');
    setPrice('');
    setOpen(false);
  };
  const Apagar2 = () => {
    setTitle_Delivery('');
    setPrice_Delivery('');

    setOpen2(false);
  };
  const Apagar3 = () => {
    setName_Discount('');
    setNumber_Discount('');

    setOpen3(false);
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
              <div className="flex-1 flex"></div>
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
            <div className="mt-8 mb-8 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-3">
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white  shadow shadow-gray-200   sm:rounded-xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Group Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Group details and informations.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4">
                        <div className="sm:col-start-1 sm:col-end-2">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-500"
                          >
                            Event Name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="cc-given-name"
                            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 mt-1 text-sm text-gray-900"
                            value={grupo_name}
                            onChange={(e) => setGrupo_Name(e.target.value)}
                            placeholder="John & Helen's Wedding"
                          />
                        </div>

                        <div className="sm:col-start-1 sm:col-end-2">
                          <Switch.Group as="div" className="flex items-center">
                            <Switch
                              checked={download}
                              onChange={() => {
                                if (download === true) {
                                  setDownload_Price('');
                                  setDownload(false);
                                } else {
                                  setDownload(true);
                                }
                              }}
                              className={classNames(
                                download ? 'bg-indigo-600' : 'bg-gray-200',
                                'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  download ? 'translate-x-5' : 'translate-x-0',
                                  'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                )}
                              />
                            </Switch>
                            <Switch.Label as="span" className="ml-3">
                              <span className="text-sm font-medium text-gray-900">
                                The Customer can choose the Image Download
                                option{' '}
                              </span>
                              <span className="text-sm text-gray-500"></span>
                            </Switch.Label>
                          </Switch.Group>
                          {download === true ? (
                            <div className="">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-500 mt-2"
                              >
                                Price to Download each Image{' '}
                                <span className="text-red-500 sm:text-sm">
                                  *
                                </span>
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 sm:text-sm">
                                    €
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name="price"
                                  id="price"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                  value={download_price}
                                  onChange={(e) =>
                                    setDownload_Price(e.target.value)
                                  }
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div className="sm:col-start-1 sm:col-end-2">
                          <div className="bg-white  ">
                            <label
                              htmlFor="postal-code"
                              className=" block text-sm font-medium text-gray-500"
                            >
                              Image Size
                            </label>
                            <div className="">
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="order-1  inline-flex items-center px-4 py-2 border border-purple-300 shadow-sm text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                                  onClick={() => setOpen(true)}
                                >
                                  <PlusIcon
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  New Size
                                </button>
                              </div>

                              <Transition.Root show={open} as={Fragment}>
                                <Dialog
                                  as="div"
                                  className="fixed z-10 inset-0 overflow-y-auto"
                                  onClose={setOpen}
                                >
                                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                          <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => Apagar()}
                                          >
                                            <span className="sr-only">
                                              Close
                                            </span>
                                            <XIcon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                          <div className="mt-2  text-center sm:mt-0  sm:text-left">
                                            <Dialog.Title
                                              as="h3"
                                              className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                              Image Size
                                            </Dialog.Title>
                                          </div>
                                        </div>
                                        <div className="mt-2">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Width{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                              cm
                                            </span>
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="2.5"
                                              value={largura}
                                              onChange={(e) =>
                                                setLargura(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="mt-2">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Height{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                              cm
                                            </span>
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="2.5"
                                              value={altura}
                                              onChange={(e) =>
                                                setAltura(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="mt-2">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Price{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                              €
                                            </span>
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="0.00"
                                              value={price}
                                              onChange={(e) =>
                                                setPrice(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                          <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => Tamanhos()}
                                          >
                                            Adicionar
                                          </button>
                                          <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => Apagar()}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </Transition.Child>
                                  </div>
                                </Dialog>
                              </Transition.Root>
                            </div>
                            <div className="overflow-hidden  border-gray-200">
                              {tamanhos.length > 0 ? (
                                <div>
                                  <table className="min-w-[25%] ">
                                    <thead className="bg-white">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Width
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Height
                                        </th>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Price
                                        </th>
                                        {/*
                                    `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                  */}
                                        <th
                                          scope="col"
                                          className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          <span className="sr-only">
                                            View receipt
                                          </span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white ">
                                      {tamanhos.map((tamanho, personIdx) => (
                                        <tr key={tamanho.id}>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {tamanho.largura} cm
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {tamanho.altura} cm
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {tamanho.price} €
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                              type="button"
                                              className=" px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                              onClick={() => {
                                                removeTamanho(tamanho.id);
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-start-1 sm:col-end-2">
                          <div className="bg-white   ">
                            <label
                              htmlFor="postal-code"
                              className=" block text-sm font-medium text-gray-500"
                            >
                              Delivery Method
                            </label>
                            <div className="">
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="order-1  inline-flex items-center px-4 py-2 border border-purple-300 shadow-sm text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                                  onClick={() => setOpen2(true)}
                                >
                                  <PlusIcon
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  New Method
                                </button>
                              </div>

                              <Transition.Root show={open2} as={Fragment}>
                                <Dialog
                                  as="div"
                                  className="fixed z-10 inset-0 overflow-y-auto"
                                  onClose={setOpen2}
                                >
                                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                          <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => Apagar2()}
                                          >
                                            <span className="sr-only">
                                              Close
                                            </span>
                                            <XIcon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                          <div className="mt-3  text-center sm:mt-0  sm:text-left">
                                            <Dialog.Title
                                              as="h3"
                                              className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                              Delivery Method
                                            </Dialog.Title>
                                          </div>
                                        </div>
                                        <div className="mt-2 rounded-md shadow-sm">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Title{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md ">
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="CTT EXPRESS"
                                              value={title_delivery}
                                              onChange={(e) =>
                                                setTitle_Delivery(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-2 rounded-md shadow-sm">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Price{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                              €
                                            </span>
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="0.00"
                                              value={price_delivery}
                                              onChange={(e) =>
                                                setPrice_Delivery(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                          <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => Deliveries()}
                                          >
                                            Adicionar
                                          </button>
                                          <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => Apagar2()}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </Transition.Child>
                                  </div>
                                </Dialog>
                              </Transition.Root>
                            </div>
                            <div className="overflow-hidden  border-gray-200">
                              {deliveries.length > 0 ? (
                                <div>
                                  <table className="min-w-[25%] ">
                                    <thead className="bg-white">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Title
                                        </th>

                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Price
                                        </th>
                                        {/*
                                    `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                  */}
                                        <th
                                          scope="col"
                                          className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          <span className="sr-only">
                                            View receipt
                                          </span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white ">
                                      {deliveries.map((delivery, personIdx) => (
                                        <tr key={personIdx}>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {delivery.title}
                                          </td>

                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {delivery.price} €
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                              type="button"
                                              className=" px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                              onClick={() => {
                                                removeDelivery(delivery.id);
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-start-1 sm:col-end-2">
                          <div className="bg-white  ">
                            <label
                              htmlFor="postal-code"
                              className=" block text-sm font-medium text-gray-500"
                            >
                              Discount
                            </label>
                            <div className="">
                              <div className="mt-2">
                                <button
                                  type="button"
                                  className="order-1  inline-flex items-center px-4 py-2 border border-purple-300 shadow-sm text-sm font-medium rounded-md text-purple-700 bg-white hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                                  onClick={() => setOpen3(true)}
                                >
                                  <PlusIcon
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  New Discount
                                </button>
                              </div>

                              <Transition.Root show={open3} as={Fragment}>
                                <Dialog
                                  as="div"
                                  className="fixed z-10 inset-0 overflow-y-auto"
                                  onClose={setOpen3}
                                >
                                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                          <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => Apagar3()}
                                          >
                                            <span className="sr-only">
                                              Close
                                            </span>
                                            <XIcon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                          <div className="mt-3  text-center sm:mt-0  sm:text-left">
                                            <Dialog.Title
                                              as="h3"
                                              className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                              Discount
                                            </Dialog.Title>
                                          </div>
                                        </div>
                                        <div className="mt-2 rounded-md shadow-sm">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Name{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md ">
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="JOHNANDHELENWEDDING"
                                              value={name_discount}
                                              onChange={(e) =>
                                                setName_Discount(e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-2 rounded-md shadow-sm">
                                          <label className="block text-sm font-medium text-gray-500">
                                            Number{' '}
                                            <span className="text-red-500 sm:text-sm">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                              %
                                            </span>
                                            <input
                                              type="text"
                                              name="company-website"
                                              id="company-website"
                                              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                              placeholder="12.5"
                                              aria-describedby="price-currency"
                                              value={number_discount}
                                              onChange={(e) =>
                                                setNumber_Discount(
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                          <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => Discounts()}
                                          >
                                            Adicionar
                                          </button>
                                          <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => Apagar3()}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </Transition.Child>
                                  </div>
                                </Dialog>
                              </Transition.Root>
                            </div>
                            <div className="overflow-hidden  border-gray-200">
                              {discounts.length > 0 ? (
                                <div>
                                  <table className="min-w-[25%] ">
                                    <thead className="bg-white">
                                      <tr>
                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Name
                                        </th>

                                        <th
                                          scope="col"
                                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          Number
                                        </th>
                                        {/*
                                    `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                  */}
                                        <th
                                          scope="col"
                                          className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                          <span className="sr-only">
                                            View receipt
                                          </span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white ">
                                      {discounts.map((discount, personIdx) => (
                                        <tr key={personIdx}>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {discount.name}
                                          </td>

                                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {discount.number} %
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                              type="button"
                                              className=" px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                              onClick={() => {
                                                removeDiscount(discount.id);
                                              }}
                                            >
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </dl>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className=" pt-4 pb-4 pr-4 sm:pt-4 sm:pb-4 sm:pr-4 ">
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => onSubmit()}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow shadow-gray-200 rounded-xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Upload the Images
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Images will belong to the group.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="col-span-2">
                          <div className="bg-white ">
                            <div>
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-500"
                              >
                                Select Images
                              </label>
                              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <div className="flex text-sm text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFile}
                                        multiple
                                      />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          {files.length > 0 ? (
                            <ul className="sm:px-6 py-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-4 lg:grid-cols-8 xl:gap-x-8">
                              {files.map((file, key) => (
                                <li key={file.name} className="relative">
                                  <div className="group block w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt=""
                                      className="object-cover pointer-events-none opacity-60 group-hover:opacity-30 sm:opacity-60 sm:group-hover:opacity-30"
                                    />
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                      <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
                                        onClick={() => {
                                          removeImage(file.name);
                                        }}
                                      >
                                        <span className="sr-only">
                                          Close sidebar
                                        </span>
                                        <XIcon
                                          className="h-6 w-6 text-black"
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                    {file.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </dl>
                    </div>
                    <div className="border-t border-gray-200">
                      <div className=" pt-4 pb-4 pr-4 sm:pt-4 sm:pb-4 sm:pr-4 ">
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => onSubmit2()}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow shadow-gray-200 rounded-xl">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Upload the Images
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Images will belong to the group.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-3">
                          {imagens.length > 0 ? (
                            <ul className="py-4 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
                              <Transition.Root show={open5} as={Fragment}>
                                <Dialog
                                  as="div"
                                  className="fixed z-10 inset-0 overflow-y-auto"
                                  onClose={setOpen5}
                                >
                                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <Transition.Child
                                      as={Fragment}
                                      enter="ease-out duration-300"
                                      enterFrom="opacity-0"
                                      enterTo="opacity-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                                      leave="ease-in duration-200"
                                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                      <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                          <button
                                            type="button"
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => setOpen5(false)}
                                          >
                                            <span className="sr-only">
                                              Close
                                            </span>
                                            <XIcon
                                              className="h-6 w-6"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                        <div className="sm:flex sm:items-start">
                                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationIcon
                                              className="h-6 w-6 text-red-600"
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                              as="h3"
                                              className="text-lg leading-6 font-medium text-gray-900"
                                            >
                                              Delete the Image
                                            </Dialog.Title>
                                            <div className="mt-2">
                                              <p className="text-sm text-gray-500">
                                                Are you sure you want to delete
                                                the Image? The Image will be
                                                permanently removed from our
                                                servers forever. This action
                                                cannot be undone.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                          <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() =>
                                              removeImageId(image_name)
                                            }
                                          >
                                            Delete
                                          </button>
                                          <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen5(false)}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    </Transition.Child>
                                  </div>
                                </Dialog>
                              </Transition.Root>
                              {imagens.map((imagem, i) => (
                                <li key={imagem._id} className="relative">
                                  <div className="group block w-full aspect-w-2 aspect-h-2 rounded-lg bg-gray-100 sm:focus-within:ring-2 sm:focus-within:ring-offset-2 sm:focus-within:ring-offset-gray-100 sm:focus-within:ring-indigo-500 sm:overflow-hidden">
                                    <img
                                      src={imagem.imag_caminho.slice(53)}
                                      alt="Imagem Escolhida"
                                      className="object-cover pointer-events-none group-hover:opacity-60  sm:group-hover:opacity-30"
                                    />

                                    <button
                                      type="button"
                                      className=""
                                      onClick={() => {
                                        setImage_Name(imagem._id);
                                        setOpen5(true);
                                      }}
                                    ></button>
                                  </div>
                                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                    {imagem.imag_name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="sm:px-6 py-4 ">
                              <h3 className=" text-md text-center leading-2 font-large text-red-600">
                                The Event has no Images
                              </h3>
                            </div>
                          )}
                        </div>
                      </dl>
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
