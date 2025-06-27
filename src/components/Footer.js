import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import suryalogo from '../assets/suryalogo.png';

const paymentIcons = [
  { src: 'https://img.icons8.com/color/48/000000/visa.png', alt: 'Visa' },
  { src: 'https://img.icons8.com/color/48/000000/mastercard-logo.png', alt: 'MasterCard' },
  { src: 'https://img.icons8.com/color/48/000000/rupay.png', alt: 'RuPay' },
  { src: 'https://img.icons8.com/color/48/000000/upi.png', alt: 'UPI' },
  { src: 'https://img.icons8.com/color/48/000000/cash-on-delivery.png', alt: 'COD' },
];

const Footer = () => (
  <footer className="bg-[#FFE9D9] text-red-600 pt-10 pb-4 px-4 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
      {/* Logo & About */}
      <div className="col-span-1 flex flex-col items-start">
        <div className="flex items-center mb-4">
          <img src={suryalogo} alt="Surya Cake Logo" className="h-14 mr-3" />
          <div>
            <h2 className="text-2xl font-bold tracking-wide text-red-600">Surya Cake</h2>
            <span className="text-pink-400 font-semibold text-sm tracking-wider">BAKERY &amp; CATERING</span>
          </div>
        </div>
        <p className="text-sm text-red-600 mb-4 max-w-xs">
          Surya Cake is a premier bakery shop with a rich legacy of over 10 years, delighting over 1 lakh satisfied customers. Our exquisite cakes, crafted with passion and quality ingredients, embody the perfect blend of taste and celebration, making every moment memorable.
        </p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-red-600 hover:text-pink-400 text-2xl"><FaInstagram /></a>
          <a href="#" className="text-red-600 hover:text-pink-400 text-2xl"><FaFacebookF /></a>
          <a href="#" className="text-red-600 hover:text-pink-400 text-2xl"><FaYoutube /></a>
        </div>
      </div>
      {/* Quick Links */}
      <div className="col-span-1">
        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
        <div className="w-10 h-0.5 bg-pink-400 mb-4" />
        <ul className="space-y-2 text-red-600">
          <li><a href="#" className="hover:text-pink-400">About Us</a></li>
          <li><a href="#" className="hover:text-pink-400">Contact Us</a></li>
          <li><a href="#" className="hover:text-pink-400">Blogs</a></li>
          <li><a href="#" className="hover:text-pink-400">Order Online</a></li>
          <li><a href="#" className="hover:text-pink-400">Visit Our Store</a></li>
        </ul>
      </div>
      {/* Policies */}
      <div className="col-span-1">
        <h3 className="text-lg font-semibold mb-2">Policies</h3>
        <div className="w-10 h-0.5 bg-pink-400 mb-4" />
        <ul className="space-y-2 text-red-600">
          <li><a href="#" className="hover:text-pink-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-pink-400">Terms &amp; Conditions</a></li>
          <li><a href="#" className="hover:text-pink-400">Refund Policy</a></li>
          <li><a href="#" className="hover:text-pink-400">Return &amp; Exchange</a></li>
          <li><a href="#" className="hover:text-pink-400">Shipping Policy</a></li>
        </ul>
      </div>
      {/* Customer Support */}
      <div className="col-span-1">
        <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
        <div className="w-10 h-0.5 bg-pink-400 mb-4" />
        <div className="text-red-600 text-sm space-y-2">
          <div>
            <span className="block font-medium">Address 1:</span>
            <span>Shop No 3.4, sector 132, Near Step-By-Step School Noida- 201304</span>
          </div>
          <div>
            <span className="block font-medium">Address 2:</span>
            <span>D-13, Bhai Ji Market, Bishanpura, Sector 58, Noida- 201301</span>
          </div>
          <div>
            <span className="block font-medium">Call:</span> 7503500400, 8750400509
          </div>
          <div>
            <span className="block font-medium">Email:</span> info@suryacake.in
          </div>
          <div>
            <span className="block font-medium">Opening Hours:</span> 09:00 AM To 01:00 AM
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          {paymentIcons.map((icon, idx) => (
            <img key={idx} src={icon.src} alt={icon.alt} className="h-7 w-auto bg-white rounded p-0.5" />
          ))}
        </div>
      </div>
    </div>
    {/* Copyright */}
    <div className="max-w-7xl mx-auto mt-8 border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-300 text-xs">
      <div>
        © 2024 by Surya Cake. Designed and Developed by <a href="#" className="underline font-semibold hover:text-pink-400">CREATORBABA</a>
      </div>
    </div>
  </footer>
);

export default Footer;
