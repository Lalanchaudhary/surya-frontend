import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  { label: 'CAKES', href: '/all-cakes' },
  { label: 'FLOWERS', href: '#' },
  { label: 'GIFTS', href: '#' },
  { label: 'CHOCOLATE', href: '#' },
  { label: 'BIRTHDAY', href: '#' },
  { label: 'COMBOS', href: '#', badge: 'New' },
  { label: 'ANNIVERSARY', href: '#' },
  { label: 'Occasion', href: '#' },
  { label: 'Customized Cakes', href: '#' },
];

const SubNavbar = () => {
  return (
    <nav className="w-full bg-red-600 border-b px-2 sm:px-4 border-gray-100 shadow-sm sticky top-0 z-30">
      <ul className="flex flex-row justify-between items-center py-2 sm:py-3 md:py-4 overflow-x-auto whitespace-nowrap gap-2 sm:gap-4 scrollbar-hide">
        {menuItems.map((item) => (
          <li key={item.label} className="relative flex items-center flex-shrink-0">
            <Link
              to={item.href}
              className="text-white font-medium transition-colors px-3 py-1 rounded-md hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {item.label}
            </Link>
            {item.badge && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-white text-black align-middle">
                {item.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SubNavbar;
