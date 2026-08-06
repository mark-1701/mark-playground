'use client';

import { useSidebarStore } from '@/stores/sidebar-store';
import clsx from 'clsx';
import Link from 'next/link';
import { PiSidebar } from 'react-icons/pi';

const NavMenu = () => {
  const isOpen = useSidebarStore(state => state.isOpen);
  const toggleIsOpen = useSidebarStore(state => state.toggleIsOpen);

  return (
    <div
      className={clsx(
        isOpen ? 'w-[380px]' : 'w-[40px]',
        'border-r border-gray-200 bg-gray-100 transition-all'
      )}
    >
      <div className={clsx(isOpen ? 'p-6' : 'p-2 pt-6')}>
        <div className="mb-12 flex items-center justify-between">
          {isOpen && <p className="font-serif text-2xl font-bold">Dashboard</p>}

          <PiSidebar
            size={22}
            className="cursor-pointer"
            onClick={() => toggleIsOpen()}
          />
        </div>

        {isOpen && (
          <div className="flex flex-col gap-4">
            <Link href="/posts">Blog</Link>
            <Link href="/dashboard/posts">Gestionar posts</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
