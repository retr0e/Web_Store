import zdj1 from "../Koncepcyjne_zdjecia/rower_szczeg_1.webp";
import zdj2 from "../Koncepcyjne_zdjecia/rower_szczeg_2.webp";
import zdj3 from "../Koncepcyjne_zdjecia/rower_szczeg_3.webp";
import zdj4 from "../Koncepcyjne_zdjecia/rower_szczeg_4.webp";
import zdj5 from "../Koncepcyjne_zdjecia/rower_szczeg_5.webp";
import zdj6 from "../Koncepcyjne_zdjecia/rower_szczeg_6.webp";

import { useParams } from "react-router-dom";

export default function DetailView() {
  const { id } = useParams();

  const addToCart = () => {
    const item = {
      id: parseInt(id, 10),
      name: "S-Works Epic 8",
      price: 69000.0,
      image: zdj1,
    };

    fetch("http://localhost:3000/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className='relative bg-gray-100'>
      <div className='nameing flex pt-8 pl-4 pb-4 items-center justify-between mr-[10%]'>
        <h2 className='name font-semibold'>S-Works Epic 8</h2>
        <span className='price font-semibold'>69 000.00 zł</span>
      </div>

      <div className='photos grid grid-cols-5 gap-5 px-4 pb-4'>
        <div className='main_photo col-span-4'>
          <img src={zdj1} alt='zdj1' className='w-full h-full' />
        </div>

        <div className='second_priority_photos col-span-1 flex flex-col'>
          <img src={zdj2} alt='zdj2' className='mb-2 ml-1 w-3/5 h-3/5' />
          <img src={zdj3} alt='zdj3' className='mb-2 ml-1 w-3/5 h-3/5' />
          <img src={zdj4} alt='zdj4' className='mb-2 ml-1 w-3/5 h-3/5' />
          <img src={zdj5} alt='zdj5' className='mb-2 ml-1 w-3/5 h-3/5' />
          <img src={zdj6} alt='zdj6' className='ml-1 w-3/5 h-3/5' />
        </div>
      </div>

      <div className='specifics flex flex-col md:flex-row md:items-center md:justify-between'>
        <div className='colors m-4'>
          <button className='bg-red-500 rounded-full inline-block w-6 h-6 mb-2 md:mb-0 md:mr-2'></button>
          <button className='bg-gray-500 rounded-full inline-block w-6 h-6'></button>
          <p className='text-gray-500 font-semibold'>Gloss Carbon/Astral Blue</p>
        </div>

        <div className='sizes flex flex-wrap pt-8 md:pt-0 md:pl-18 justify-center md:mr-[21%]'>
          <button className='w-20 h-8 border-gray-500 border rounded-md font-semibold mb-2 mr-2'>
            S
          </button>
          <button className='w-20 h-8 border-gray-500 border rounded-md font-semibold mb-2 mr-2'>
            M
          </button>
          <button className='w-20 h-8 border-gray-500 border rounded-md font-semibold mb-2 mr-2'>
            L
          </button>
          <button className='w-20 h-8 border-gray-500 border rounded-md font-semibold mb-2'>
            XL
          </button>
        </div>
      </div>

      <button
        className='cart_add ml-auto mt-4 mr-16 bg-black text-white border-gray-500 border rounded-md w-full md:w-48 h-12 font-semibold md:ml-4'
        onClick={addToCart}
      >
        Dodaj do koszyka
      </button>

      <hr className='border-t-2 border-dotted border-gray-300 w-5/6 mx-auto my-5' />

      <div className='description px-4 mt-4 text-justify mx-3 pb-6'>
        <span className='text-gray-700'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor
          rhoncus dolor. Auctor neque vitae tempus quam pellentesque nec. Tristique et
          egestas quis ipsum suspendisse ultrices gravida dictum. Viverra suspendisse
          potenti nullam ac. Aliquet eget sit amet tellus cras adipiscing. A cras semper
          auctor neque vitae. Donec pretium vulputate sapien nec sagittis aliquam.
          Pulvinar elementum integer enim neque. Ipsum faucibus vitae aliquet nec
          ullamcorper sit. Egestas purus viverra accumsan in nisl nisi scelerisque. Justo
          donec enim diam vulputate ut pharetra sit amet. Hendrerit dolor magna eget est
          lorem ipsum dolor sit. Sapien et ligula ullamcorper malesuada proin libero nunc
          consequat. At imperdiet dui accumsan sit. Lectus magna fringilla urna porttitor.
          Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Amet nulla
          facilisi morbi tempus. Ultricies mi eget mauris pharetra et ultrices. Erat
          pellentesque adipiscing commodo elit at. Sagittis id consectetur purus ut. A
          diam sollicitudin tempor id. Nisl pretium
        </span>
      </div>
    </main>
  );
}
