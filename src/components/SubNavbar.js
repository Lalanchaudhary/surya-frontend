import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  {
    label: 'Cakes',
    dropdown: [
      { name: 'Chocolate Cakes', href: 'chocolate-cake' },
      { name: 'Vanilla Cakes', href: 'vanilla-cake' },
      { name: 'Red Velvet Cakes', href: 'red-velvet-cake' },
      { name: 'Fruit Cakes', href: 'fruit-cake' },
      { name: 'Heart shape cake', href: 'heart-shape-cake' },
      { name: 'pineapple-cake', href: 'pineapple-cake' },
      { name: 'Butterscotch-cake', href: 'butterscotch-cake' },
      { name: 'Black-forest-cake', href: 'black-forest-cake'},],
  },
  {
    label: 'Theme Cakes',
    dropdownGroups: [
      {
        title: 'Kids Cakes',
        items: [
          { name: '1st Birthday Cakes', href: '1st-birthday-cakes' },
          { name: 'Princess Cakes', href: 'princess-cakes' },
          { name: 'Animal Cakes', href: 'animal-cakes' },
          { name: 'Masha & The Bear Cakes', href: 'masha-bear-cakes' },
          { name: 'Cakes For Boys', href: 'cakes-for-boys' },
          { name: 'Cakes For Girls', href: 'cakes-for-girls' },
          { name: 'Number Cakes', href: 'number-cakes' },
          { name: 'Alphabet Cakes', href: 'alphabet-cakes' },
          { name: 'Car And Vehicle Cakes', href: 'car-vehicle-cakes' },
          { name: 'Baby Shark Cakes', href: 'baby-shark-cakes' },
          { name: 'All Kids Cakes', href: 'all-kids-cakes' },
        ]
      },
      {
        title: 'Character Cakes',
        items: [
          { name: 'Spiderman Cakes', href: 'spiderman-cakes' },
          { name: 'Unicorn Cakes', href: 'unicorn-cakes' },
          { name: 'Barbie Cakes', href: 'barbie-cakes' },
          { name: 'Avenger Cakes', href: 'avenger-cakes' },
          { name: 'Peppa Pig Cakes', href: 'peppa-pig-cakes' },
          { name: 'Doraemon Cakes', href: 'doraemon-cakes' },
          { name: 'Naruto Cakes', href: 'naruto-cakes' },
          { name: 'Cocomelon Cakes', href: 'cocomelon-cakes' },
          { name: 'Cartoon Cakes', href: 'cartoon-cakes' },
          { name: 'Super Hero Cakes', href: 'super-hero-cakes' },
        ]
      },
      {
        title: 'Grown Up Cakes',
        items: [
          { name: 'Bride To Be Cakes', href: 'bride-to-be-cakes' },
          { name: 'Wedding Cakes', href: 'wedding-cakes' },
          { name: 'Gym Cakes', href: 'gym-cakes' },
          { name: 'Party Cakes', href: 'party-cakes' },
        ]
      },
      {
        title: 'More Cakes',
        items: [
          { name: 'Jungle Theme Cakes', href: 'jungle-theme-cakes' },
          { name: 'Cricket Cakes', href: 'cricket-cakes' },
          { name: 'Football Cakes', href: 'football-cakes' },
          { name: 'Basketball Cakes', href: 'basketball-cakes' },
          { name: 'Rainbow Cakes', href: 'rainbow-cakes' },
          { name: 'Butterfly Cakes', href: 'butterfly-cakes' },
          { name: 'Dinosaur Cakes', href: 'dinosaur-cakes' },
          { name: 'All Designer Cakes', href: 'all-designer-cakes' },
        ]
      }
    ]
  },
  {
    label: 'Birthday',
    dropdown: [
      { name: 'Birthday Cakes', href: 'Birthday' },
      { name: '1st Birthday Cakes', href: 'Birthday' },
      { name: 'Birthday Photo Cakes', href: 'Birthday' },
      { name: 'Half Birthday Cakes', href: 'Birthday' },
    ],
  },
      {
    label: 'Photo Cakes',
    dropdown: [
      { name: 'Photo Cakes', href: 'Photo-cakes' },
      { name: 'Name Cakes', href: 'Photo-cakes' },
      { name: 'Designer Cakes', href: 'Photo-cakes' },
      { name: '3D Cakes', href: 'Photo-cakes' },
      { name: 'Fondant Cakes', href: 'Photo-cakes' },
      { name: 'Custom Flavors', href: 'Photo-cakes' },
    ],
  },
  {
    label: 'Anniversary',
    dropdown: [
      { name: '1st-anniversary-cakes', href: 'Anniversary' },
      { name: 'Dating Anniversary', href: 'Anniversary' },
      { name: 'Work Anniversary', href: 'Anniversary' },
      { name: 'Friendship Anniversary', href: 'Anniversary' },
      { name: 'Anniversary Combos', href: 'Anniversary' },
      { name: 'Anniversary Specials', href: 'Anniversary' },
    ],
  },
  {
    label: 'Occasion',
    dropdownGroups: [
      {
        title: 'Festive Celebrations',
        items: [
          { name: 'Friendship Day Cakes', href: '1st-birthday-cakes' },
          { name: 'Independence Day Cakes', href: 'princess-cakes' },
          { name: 'Rakhi Cakes', href: 'animal-cakes' },
          { name: 'Janmashtami Cakes', href: 'masha-bear-cakes' },
          { name: 'Teachers Day Cakes', href: 'cakes-for-boys' },
          { name: 'Ganesh Chaturthi Cakes', href: 'animal-cakes' },
        ]
      },
      {
        title: 'Special Milestones',
        items: [
          { name: 'Baby Shower Cakes', href: 'cakes-for-boys' },
          { name: 'Congratulations Cakes', href: 'unicorn-cakes' },
          { name: 'Retirement Cakes', href: 'barbie-cakes' },
          { name: 'Farewell Cakes', href: 'avenger-cakes' },
          { name: 'Wedding Cakes', href: 'peppa-pig-cakes' },
        ]
      },
    ]
  },
  {
    label: 'By Relationship',
    dropdownGroups: [
      {
        title: 'For Him',
        items: [
          { name: 'Cakes For Friend', href: '1st-birthday-cakes' },
          { name: 'Cakes For Father', href: 'princess-cakes' },
          { name: 'Cakes For Husband', href: 'animal-cakes' },
          { name: 'Cakes For Brother', href: 'masha-bear-cakes' },
          { name: 'Cakes For Boyfriend', href: 'cakes-for-boys' },
        ]
      },
      {
        title: 'For Her',
        items: [
          { name: 'Cakes For Friend', href: 'spiderman-cakes' },
          { name: 'Cakes For Mother', href: 'unicorn-cakes' },
          { name: 'Cakes For Wife', href: 'barbie-cakes' },
          { name: 'Cakes For Girlfriend', href: 'avenger-cakes' },
          { name: 'Cakes For Sister', href: 'peppa-pig-cakes' },
        ]
      },
    ]
  }
];

const SubNavbar = ({ vertical = false }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const itemRefs = useRef({});
  const navigate = useNavigate();

  const handleMouseEnter = (label) => {
    if (!vertical && window.innerWidth >= 768 && itemRefs.current[label]) {
      const rect = itemRefs.current[label].getBoundingClientRect();
      const dropdownWidth = 720; // or your dropdown's width in px
      const margin = 12;

      // Default: left edge of dropdown aligns with left edge of label
      let calculatedLeft = rect.left;

      // If dropdown would overflow right, shift it left just enough to fit
      if (calculatedLeft + dropdownWidth > window.innerWidth - margin) {
        calculatedLeft = window.innerWidth - dropdownWidth - margin;
      }
      // Prevent overflow on the left
      if (calculatedLeft < margin) {
        calculatedLeft = margin;
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

  const handleMobileDropdownToggle = (label) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMobileNavigate = (href) => {
    navigate(href);
    setMobileMenuOpen(false);
    setMobileDropdownOpen({});
  };

  return (
    <nav
      className={`w-full bg-red-600 border-b border-gray-100 shadow-sm relative`}
    >
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <span className="text-white text-lg font-bold">Menu</span>
        <button
          className="text-white focus:outline-none"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      <ul
        className={`hidden md:flex flex-row justify-between items-center px-8 py-3 md:py-4 overflow-x-auto whitespace-nowrap`}
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
                  className={`text-md md:text-lg font-normel text-white hover:text-rose-500 transition-colors px-2`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>

              {isActive && (
                <div
                  className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-50 min-w-[240px] py-2"
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                  }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
                  </div>
                  {item.dropdownGroups ? (
                    <div className="flex flex-row gap-8 px-4 py-2">
                      {item.dropdownGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="min-w-[180px]">
                          <h4 className="font-bold text-gray-800 text-md mb-2 flex items-center">
                            <span className="text-yellow-400 mr-2">✱</span> {group.title}
                          </h4>
                          <ul>
                            {group.items.map((dropdownItem, idx) => (
                              <li key={idx}>
                                <button
                                  onClick={() => navigate(`/cakes/${dropdownItem.href}`)}
                                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                >
                                  {dropdownItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="py-1">
                      {item.dropdown && item.dropdown.map((dropdownItem, index) => (
                        <li key={index}>
                          <button
                            onClick={() =>{navigate(`/cakes/${dropdownItem.href}`)}}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
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
      {mobileMenuOpen && (
        <ul className="md:hidden flex flex-col gap-2 items-start px-4 py-2 bg-white border-t border-gray-200 z-50 w-full absolute left-0 top-full shadow-lg animate-fade-in">
          {menuItems.map((item) => (
            <li key={item.label} className="w-full">
              <button
                className="flex justify-between items-center w-full py-2 text-left text-base font-medium text-gray-800 hover:text-rose-600 focus:outline-none"
                onClick={() => handleMobileDropdownToggle(item.label)}
              >
                <span>{item.label}</span>
                <svg
                  className={`h-5 w-5 ml-2 transition-transform ${mobileDropdownOpen[item.label] ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {mobileDropdownOpen[item.label] && (
                <ul className="pl-4 pb-2">
                  {item.dropdownGroups
                    ? item.dropdownGroups.map((group, groupIdx) => (
                        <div key={groupIdx}>
                          <div className="font-bold text-gray-800 text-md mb-1 flex items-center">
                            <span className="text-yellow-400 mr-2">✱</span> {group.title}
                          </div>
                          {group.items.map((dropdownItem, idx) => (
                            <li key={idx}>
                              <button
                                onClick={() => handleMobileNavigate(`/cakes/${dropdownItem.href}`)}
                                className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                              >
                                {dropdownItem.name}
                              </button>
                            </li>
                          ))}
                        </div>
                      ))
                    : item.dropdown &&
                      item.dropdown.map((dropdownItem, idx) => (
                        <li key={idx}>
                          <button
                            onClick={() => handleMobileNavigate(`/cakes/${dropdownItem.href}`)}
                            className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                          >
                            {dropdownItem.name}
                          </button>
                        </li>
                      ))}
                  <li className="pt-2">
                    <button
                      onClick={() => handleMobileNavigate(item.href || '/cakes')}
                      className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                    >
                      View All {item.label} →
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default SubNavbar;