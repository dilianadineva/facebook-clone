import Image from 'next/image';
import React from 'react';
import facebookLogo from '../public/facebook-logo.png';
import { useSession, signOut } from 'next-auth/react';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
  PlusIcon,
} from '@heroicons/react/outline';
import HeaderIcon from './HeaderIcon';

function Header() {
  const { data: session } = useSession();
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md '>
      {/* Left */}
      <div className='flex items-center'>
        <div>
          <Image src={facebookLogo} width={40} height={40} layout='fixed' />
        </div>
        <div className='flex items-center rounded-full bg-gray-100 p-2 ml-4'>
          <SearchIcon className='h-6  text-gray-600 ' />
          <input
            className='hidden md:inline-flex ml-2 items-center bg-transparent  outline-none  flex-shrink'
            type='text'
            placeholder='Search Facebook'
          />
        </div>
      </div>
      {/* Center */}
      <div className='flex justify-center flex-grow'>
        <div className='flex space-x-6 md:space-x-2'>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      <div className='flex items-center sm:space-x-2 justify-end'>
        {/* Profile pic */}
        <Image
          src={session?.user?.image}
          onClick={signOut}
          width='40'
          height='40'
          layout='fixed'
          className='rounded-full cursor-pointer'
        />
        <p className='font-semibold  whitespace-nowrap pr-3 '>
          {session?.user?.name}
        </p>
        <PlusIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  );
}

export default Header;
