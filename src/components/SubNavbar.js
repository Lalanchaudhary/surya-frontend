import React, { useState, useRef, useEffect } from 'react';
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
          { name: '1st-birthday-cakes', href: '1st-birthday-cakes' },
          { name: 'princess-cakes', href: 'princess-cakes' },
          { name: 'animal-cakes', href: 'animal-cakes' },
          { name: 'number-cakes', href: 'number-cakes' },
          { name: 'car-vehicle-cakes', href: 'car-vehicle-cakes' },
        ]
      },
      {
        title: 'Character Cakes',
        items: [
          { name: 'spiderman-cakes', href: 'spiderman-cakes' },
          { name: 'unicorn-cake', href: 'unicorn-cake' },
          { name: 'peppa-pig-cakes', href: 'peppa-pig-cakes' },
          { name: 'doraemon-cakes', href: 'doraemon-cakes' },
          { name: 'cartoon-cakes', href: 'cartoon-cakes' },
          { name: 'super-hero-cakes', href: 'super-hero-cakes' },
        ]
      },
      {
        title: 'Grown Up Cakes',
        items: [
          { name: 'bride-to-be-cakes', href: 'bride-to-be-cakes' },
          { name: 'wedding-cakes', href: 'wedding-cakes' },
          { name: 'gym-cakes', href: 'gym-cakes' },
          { name: 'party-cakes', href: 'party-cakes' },
        ]
      },
      {
        title: 'More Cakes',
        items: [
          { name: 'jungle-theme-cakes', href: 'jungle-theme-cakes' },
          { name: 'cricket-cakes', href: 'cricket-cakes' },
          { name: 'football-cakes', href: 'football-cakes' },
          { name: 'rainbow-cakes', href: 'rainbow-cakes' },
          { name: 'butterfly-cakes', href: 'butterfly-cakes' },
        ]
      }
    ]
  },
  {
    label: 'Birthday',
    dropdown: [
      { name: 'Birthday', href: 'Birthday' },
      { name: '1st-Birthday-Cakes', href: '1st-Birthday-Cakes' },
      { name: 'Birthday-Photo-Cakes', href: 'Birthday-Photo-Cakes' },
      { name: 'Half-Birthday-Cakes', href: 'Half-Birthday-Cakes' },
    ],
  },
      {
    label: 'Photo Cakes',
    dropdown: [
      { name: 'Photo-Cakes', href: 'Photo-cakes' },
    ],
  },
  {
    label: 'Anniversary',
    dropdown: [
      { name: '1st-anniversary-cakes', href: '1st-anniversary-cakes' },
      { name: 'Anniversary-Photo-Cakes', href: 'Anniversary-Photo-Cakes' },
    ],
  },
  {
    label: 'Combo',
    dropdown: [
      { name: 'Combo', href: 'Combo' },
    ],
  },
  {
    label: 'Occasion',
    dropdownGroups: [
      {
        title: 'Festive Celebrations',
        items: [
          { name: 'Friendship-Day-Cakes', href: 'Friendship-Day-Cakes' },
          { name: 'Independence-Day-Cakes', href: 'Independence-Day-Cakes' },
          { name: 'Rakhi-Cakes', href: 'Rakhi-Cakes' },
          { name: 'Janmashtami-Cakes', href: 'Janmashtami-Cakes' },
          { name: 'Teachers-Day-Cakes', href: 'Teachers-Day-Cakes' },
          { name: 'Ganesh-Chaturthi-Cakes', href: 'Ganesh-Chaturthi-Cakes' },
        ]
      },
      {
        title: 'Special Milestones',
        items: [
          { name: 'Baby-Shower-Cakes', href: 'Baby-Shower-Cakes' },
          { name: 'Congratulations-Cakes', href: 'Congratulations-Cakes' },
          { name: 'Retirement-Cakes', href: 'Retirement-Cakes' },
          { name: 'Farewell-Cakes', href: 'Farewell-Cakes' },
          { name: 'Wedding-Cakes', href: 'Wedding-Cakes' },
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
          { name: 'Cakes-For-Friend', href: 'Cakes-For-Friend' },
          { name: 'Cakes-For-Father', href: 'Cakes-For-Father' },
          { name: 'Cakes-For-Husband', href: 'Cakes-For-Husband' },
          { name: 'Cakes-For-Brother', href: 'Cakes-For-Brother' },
          { name: 'Cakes-For-Boyfriend', href: 'Cakes-For-Boyfriend' },
        ]
      },
      {
        title: 'For Her',
        items: [
          { name: 'Cakes-For-Friend', href: 'Cakes-For-Friend' },
          { name: 'Cakes-For-Mother', href: 'Cakes-For-Mother' },
          { name: 'Cakes-For-Wife', href: 'Cakes-For-Wife' },
          { name: 'Cakes-For-Girlfriend', href: 'Cakes-For-Girlfriend' },
          { name: 'Cakes-For-Sister', href: 'Cakes-For-Sister' },
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
  const [navbarHeight, setNavbarHeight] = useState(0);
  const itemRefs = useRef({});
  const navigate = useNavigate();

  // Calculate navbar height for sticky positioning
  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('nav[class*="sticky"]');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    calculateNavbarHeight();
    window.addEventListener('resize', calculateNavbarHeight);
    
    return () => window.removeEventListener('resize', calculateNavbarHeight);
  }, []);

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
      className={`w-full bg-red-600 border-b border-gray-100 shadow-sm relative sticky z-40`}
      style={{ top: navbarHeight }}
    >
      <div className="md:hidden flex items-center justify-between px-4 py-1">
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
        className={`hidden md:flex flex-row justify-between items-center px-8 py-2 md:py-2 overflow-x-auto whitespace-nowrap`}
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
                  className={`text-md md:text-lg font-medium text-white hover:text-rose-500 transition-colors px-2`}
                >
                  {item.label}
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
                      onClick={() => {navigate('/all-cakes')}}
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