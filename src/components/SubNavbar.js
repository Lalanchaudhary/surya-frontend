import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    label: 'Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Chocolate Cakes', href: '/chocolate-cakes' },
      { name: 'Vanilla Cakes', href: '/vanilla-cakes' },
      { name: 'Red Velvet Cakes', href: '/all-cakes' },
      { name: 'Fruit Cakes', href: '/all-cakes' },
      { name: 'Cheesecakes', href: '/all-cakes' },
      { name: 'Ice Cream Cakes', href: '/all-cakes' },
    ],
  },
  {
    label: 'Theme Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Cartoon Theme', href: '/cartoon-cakes' },
      { name: 'Superhero Theme', href: '/superhero-cakes' },
      { name: 'Cricket Theme', href: '/cricket-cakes' },
      { name: 'Nature Theme', href: '/nature-cakes' },
    ],
  },
  {
    label: 'By Relationship',
    href: '/all-cakes',
    dropdown: [
      { name: 'For Parents', href: '/all-cakes' },
      { name: 'For Siblings', href: '/all-cakes' },
      { name: 'For Friends', href: '/all-cakes' },
      { name: 'For Colleagues', href: '/all-cakes' },
      { name: 'For Children', href: '/all-cakes' },
      { name: 'For Grandparents', href: '/all-cakes' },
    ],
  },
  {
    label: 'Birthday',
    href: '/birthday-cakes',
    dropdown: [
      { name: 'Kids Birthday', href: '/birthday-cakes' },
      { name: 'Adult Birthday', href: '/birthday-cakes' },
      { name: 'Milestone Birthday', href: '/birthday-cakes' },
      { name: 'Surprise Birthday', href: '/birthday-cakes' },
      { name: 'Birthday Combos', href: '/birthday-cakes' },
      { name: 'Birthday Specials', href: '/birthday-cakes' },
    ],
  },
      {
    label: 'Photo Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Photo Cakes', href: '/all-cakes' },
      { name: 'Name Cakes', href: '/all-cakes' },
      { name: 'Designer Cakes', href: '/all-cakes' },
      { name: '3D Cakes', href: '/all-cakes' },
      { name: 'Fondant Cakes', href: '/all-cakes' },
      { name: 'Custom Flavors', href: '/all-cakes' },
    ],
  },
  {
    label: 'Anniversary',
    href: '/anniversary',
    dropdown: [
      { name: '1st-anniversary-cakes', href: '/1st-anniversary-cakes' },
      { name: 'Dating Anniversary', href: '/anniversary-cakes' },
      { name: 'Work Anniversary', href: '/anniversary-cakes' },
      { name: 'Friendship Anniversary', href: '/anniversary-cakes' },
      { name: 'Anniversary Combos', href: '/anniversary-cakes' },
      { name: 'Anniversary Specials', href: '/anniversary' },
    ],
  },
  {
    label: 'Occasion',
    href: '/all-cakes',
    dropdown: [
      { name: 'FriendShip Day', href: '/friendshipday-cakes' },
      { name: 'Baby Shower', href: '/all-cakes' },
      { name: 'Graduation', href: '/graduation-cakes' },
      { name: 'House Warming', href: '/all-cakes' },
      { name: 'Farewell', href: '/all-cakes' },
      { name: 'Congratulations', href: '/all-cakes' },
    ],
  },
  {
    label: 'Customized Cakes',
    href: '/all-cakes',
    dropdown: [
      { name: 'Photo Cakes', href: '/all-cakes' },
      { name: 'Name Cakes', href: '/all-cakes' },
      { name: 'Designer Cakes', href: '/all-cakes' },
      { name: '3D Cakes', href: '/all-cakes' },
      { name: 'Fondant Cakes', href: '/all-cakes' },
      { name: 'Custom Flavors', href: '/all-cakes' },
    ],
  },
];

const SubNavbar = ({ vertical = false }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const itemRefs = useRef({});
  const navigate = useNavigate();

  const handleMouseEnter = (label) => {
    if (!vertical && itemRefs.current[label]) {
      const rect = itemRefs.current[label].getBoundingClientRect();
      const dropdownWidth = 260;
      const margin = 12;
  
      let calculatedLeft = rect.left + rect.width / 2;
      if (calculatedLeft - dropdownWidth / 2 < margin) {
        calculatedLeft = dropdownWidth / 2 + margin;
      }
  
      setDropdownPos({
        top: rect.bottom + 4,
        left: calculatedLeft,
      });
      setHoveredItem(label);
    }
  };
  

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredItem(null);
    }, 150); // slight delay
  };

  const handleItemClick = (href) => {
    navigate(href);
    setHoveredItem(null);
  };

  const handleDropdownItemClick = (href) => {
    navigate(href);
    setHoveredItem(null);
  };

  return (
    <nav
      className={`w-full bg-red-600 border-b border-gray-100 shadow-sm ${
        vertical ? '' : 'hidden md:block'
      } relative`}
    >
      <ul
        className={`flex ${
          vertical
            ? 'flex-col gap-2 items-start px-4 py-2'
            : 'flex-row justify-between items-center px-8 py-3 md:py-4 overflow-x-auto whitespace-nowrap'
        }`}
      >
        {menuItems.map((item) => {
          const isActive = hoveredItem === item.label;

          return (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <li
                ref={(el) => (itemRefs.current[item.label] = el)}
                className="relative flex flex-col items-start group"
              >
                <button
                  onClick={() => handleItemClick(item.href)}
                  className={`text-md md:text-lg font-normel text-white hover:text-rose-500 transition-colors px-2 ${
                    vertical ? 'py-1' : ''
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>

              {/* Dropdown shown inside same wrapper */}
              {isActive && (
                <div
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-50 min-w-[240px] py-2"
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
                  </div>
                  <ul className="py-1">
                    {item.dropdown.map((dropdownItem, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleDropdownItemClick(dropdownItem.href)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        >
                          {dropdownItem.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => handleItemClick(item.href)}
                      className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                    >
                      View All {item.label} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </nav>
  );
};

export default SubNavbar;