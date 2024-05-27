import menuImg from "./../Koncepcyjne_zdjecia/burger_menu.webp";
import mainLogo from "./../Koncepcyjne_zdjecia/main_logo.png";

import { useState, useEffect, useRef } from "react";

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className='relative flex flex-col items-center m-2 w-full'>
      <div className='flex justify-center items-center'>
        <img className='w-24 p-3' src={mainLogo} alt='main_logo' />
      </div>
      <div className='flex justify-between items-center w-full' ref={menuRef}>
        <input
          className='w-full bg-black text-white rounded-full p-2 pl-5'
          type='text'
          placeholder='Wpisz frazę, której szukasz.'
        />

        <button className='ml-10 mr-4' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img className='w-7' src={menuImg} alt='menu_pic' />
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className='absolute top-full right-0 z-50 bg-white border rounded-lg shadow-lg'>
            <div className='block px-4 py-2'>
              <a
                href='#'
                className='text-gray-800 hover:bg-gray-200 block px-4 py-2 text-sm'
              >
                Item 1
              </a>
              <a
                href='#'
                className='text-gray-800 hover:bg-gray-200 block px-4 py-2 text-sm'
              >
                Item 2
              </a>
              <a
                href='#'
                className='text-gray-800 hover:bg-gray-200 block px-4 py-2 text-sm'
              >
                Item 3
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
