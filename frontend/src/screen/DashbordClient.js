import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { SearchIcon, PlusIcon } from '@heroicons/react/solid';
import ProfileClient from '../Components/ProfileClient';
import MenuSliderClient from '../Components/MenuSliderClient';
import Project from '../screen/Project';
import ImagesofProject from '../Components/ImagesofProject';
import Orders from './Orders';
import { clientes } from '../data2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  //{ name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Pedidos', href: '#', icon: CalendarIcon, current: false },
  //{ name: 'Documents', href: '#', icon: InboxIcon, current: false },
  //{ name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
/*
{
    name: 'Jane Cooper',
    tittle: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'jane.cooper@example.com',
  },*/

export default function DashbordClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div>OLa</div>;
}
