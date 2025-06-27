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

const SubNavbar = ({ vertical = false }) => {
  return (
    <nav className={`w-full bg-red-600 border-b px-6 border-gray-100 shadow-sm ${vertical ? '' : 'hidden md:block'}`}>
      <ul className={`flex ${vertical ? 'flex-col gap-2 items-start px-4 py-2' : 'flex-row justify-between items-center py-3 md:py-4 overflow-x-auto whitespace-nowrap'}`}>
        {menuItems.map((item) => (
          <li key={item.label} className="relative flex items-center">
            <Link
              to={item.href}
              className={`text-white font-medium transition-colors px-2 hover:text-rose-300 ${vertical ? 'py-1' : ''}`}
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
