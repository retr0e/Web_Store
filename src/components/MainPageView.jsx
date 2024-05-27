// import cartPic from "../Koncepcyjne_zdjecia/cart.png";
// import menuPic from "../Koncepcyjne_zdjecia/burger_menu.webp";
import mainLogo from "../Koncepcyjne_zdjecia/main_logo.png";
import mainPic from "../Koncepcyjne_zdjecia/rower_1.jpeg";
import infoBox1 from "../Koncepcyjne_zdjecia/info_box_1.png";
import infoBox2 from "../Koncepcyjne_zdjecia/info_box_2.png";
import infoBox3 from "../Koncepcyjne_zdjecia/info_box_3.png";
import mountainBackground from "../Koncepcyjne_zdjecia/kat_gorskie.jpeg";
import roadBackground from "../Koncepcyjne_zdjecia/kat_szosowe.jpeg";
import activeBackground from "../Koncepcyjne_zdjecia/kat_active.jpeg";
import electricBackground from "../Koncepcyjne_zdjecia/kat_elektryczne.jpeg";
import childBackground from "../Koncepcyjne_zdjecia/kat_dzieciece.png";

import { Link } from "react-router-dom";

export default function MainPageView() {
  return (
    <div>
      {/* <div className='flex justify-end items-center order-3 md:order-3 mr-6'>
        <button className='mr-4'>
          <img className='w-20' src={cartPic} alt='cart_pic' />
        </button>
        <button>
          <img className='w-7' src={menuPic} alt='menu_pic' />
        </button>
      </div> */}

      <div className='main_view flex flex-col items-center relative'>
        <img
          className='main_logo w-20 md:w-48 absolute top-0 mt-10'
          src={mainLogo}
          alt='main_logo'
        />
        <img
          className='main_pic w-full max-w-full max-h-full'
          src={mainPic}
          alt='main_picture'
        />
      </div>

      <main className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-4'>
        <div
          className='bg-cover bg-center border border-gray-300 rounded-lg h-96 flex flex-col justify-center items-center md:col-span-2'
          style={{ backgroundImage: `url(${mountainBackground})` }}
        >
          <h1 className='text-white text-xl font-bold mb-4'>Górskie</h1>
          <Link to='/store'>
            <span className='border-none text-white bg-red-500 rounded-lg px-4 py-2'>
              Więcej
            </span>
          </Link>
        </div>
        <div
          className='bg-cover bg-center border border-gray-300 rounded-lg h-96 flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${roadBackground})` }}
        >
          <h1 className='text-white text-xl font-bold mb-4'>Szosowe</h1>
          <Link to='/store'>
            <span className='border-none text-white bg-red-500 rounded-lg px-4 py-2'>
              Więcej
            </span>
          </Link>
        </div>

        <div
          className='bg-cover bg-center border border-gray-300 rounded-lg h-96 flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${activeBackground})` }}
        >
          <h1 className='text-white text-xl font-bold mb-4'>Active</h1>
          <Link to='/store'>
            <span className='border-none text-white bg-red-500 rounded-lg px-4 py-2'>
              Więcej
            </span>
          </Link>
        </div>
        <div
          className='bg-cover bg-center border border-gray-300 rounded-lg h-96 flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${electricBackground})` }}
        >
          <h1 className='text-white text-xl font-bold mb-4'>Elektryczne</h1>
          <Link to='/store'>
            <span className='border-none text-white bg-red-500 rounded-lg px-4 py-2'>
              Więcej
            </span>
          </Link>
        </div>
        <div
          className='bg-cover bg-center border border-gray-300 rounded-lg h-96 flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${childBackground})` }}
        >
          <h1 className='text-white text-xl font-bold mb-4'>Dziecięce</h1>
          <Link to='/store'>
            <span className='border-none text-white bg-red-500 rounded-lg px-4 py-2'>
              Więcej
            </span>
          </Link>
        </div>
      </main>

      <div className='info_bar grid place-items-center grid-cols-3 justify-center gap-4 mx-4'>
        <img src={infoBox1} alt='info_1' className='max-w-full h-auto' />
        <img src={infoBox2} alt='info_2' className='max-w-full h-auto' />
        <img src={infoBox3} alt='info_3' className='max-w-full h-auto' />
      </div>
    </div>
  );
}
