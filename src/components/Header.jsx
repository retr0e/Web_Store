import cartImg from "./../Koncepcyjne_zdjecia/cart.png";
import menuImg from "./../Koncepcyjne_zdjecia/burger_menu.webp";
import mainLogo from "./../Koncepcyjne_zdjecia/main_logo.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios"; // Import biblioteki Axios

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    // Funkcja do pobierania danych o zalogowanym użytkowniku z API
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:3000/isAuth`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json(); // Przetworzenie odpowiedzi do formatu JSON
          setIsAdmin(userData);
        } else {
          console.error("Server responded with an error:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData(); // Wywołanie funkcji pobierającej dane o użytkowniku po zamontowaniu komponentu
  }, []);

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
    <header
      className='relative flex justify-between items-center m-2 w-full md:grid md:grid-cols-3'
      style={{ gridTemplateColumns: "10% 60% 30%" }}
    >
      <div className='flex justify-center md:justify-start items-center order-2 md:order-1'>
        <Link to='/'>
          <img className='w-32 p-3' src={mainLogo} alt='main_logo' />
        </Link>
      </div>

      <div
        className='flex justify-end items-center order-3 md:order-3 mr-6'
        ref={menuRef}
      >
        <button className='mr-4'>
          <Link to='/cart'>
            <img className='w-20' src={cartImg} alt='cart_pic' />
          </Link>
        </button>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img className='w-7' src={menuImg} alt='menu_pic' />
        </button>

        {isMenuOpen && (
          <div className='absolute right-0 mt-12 w-48 bg-white border rounded-lg shadow-lg z-50'>
            <div className='block px-4 py-2'>
              <a
                href='/login'
                className='text-gray-800 hover:bg-gray-200 block px-4 py-2 text-sm'
              >
                Logowanie
              </a>
              {isAdmin && (
                <a
                  href='/admin'
                  className='text-gray-800 hover:bg-gray-200 block px-4 py-2 text-sm'
                >
                  Admin Panel
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className='hidden md:block order-1 md:order-2'>
        <div className='flex justify-center items-center pt-8'>
          <input
            className='w-3/4 md:w-full bg-black text-white rounded-full p-2 pl-5 mr-2'
            type='text'
            name=''
            id=''
            placeholder='Wpisz frazę, której szukasz.'
          />
        </div>
        <div className='m-2'>
          <Link to='/store'>
            <span className='m-2'>Górskie</span>
          </Link>
          <Link to='/store'>
            <span className='m-2'>Szosowe</span>
          </Link>
          <Link to='/store'>
            <span className='m-2'>Elektryczne</span>
          </Link>
          <Link to='/store'>
            <span className='m-2'>Active</span>
          </Link>
          <Link to='/store'>
            <span className='m-2'>Dziecięce</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
