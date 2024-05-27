import firstPhoto from "./../Koncepcyjne_zdjecia/rower_list_1.webp";
import secondPhoto from "./../Koncepcyjne_zdjecia/rower_list_2.webp";
import thirdPhoto from "./../Koncepcyjne_zdjecia/rower_list_3.webp";

import { Link } from "react-router-dom";

export default function ViewProducts() {
  return (
    <main className='grid max-w-fit mx-auto bg-[#fafafa] w-full justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pb-[23%]'>
      <div className='relative p-10 item flex flex-col'>
        <Link to='/store/1'>
          <img src={firstPhoto} alt='' className='w-full mb-2' />
        </Link>
        <h2>S-Works Epic 8</h2>
        <span className='p-2 font-bold self-end'>69 000,00 zł</span>
      </div>
      <div className='relative p-10 item flex flex-col'>
        <Link to='/store/2'>
          <img src={secondPhoto} alt='' className='w-full mb-2' />
        </Link>
        <h2>S-Works Epic 8</h2>
        <span className='p-2 font-bold self-end'>69 000,00 zł</span>
      </div>
      <div className='relative p-10 item flex flex-col'>
        <Link to='/store/3'>
          <img src={thirdPhoto} alt='' className='w-full mb-2' />
        </Link>
        <h2>S-Works Epic 8</h2>
        <span className='p-2 font-bold self-end'>69 000,00 zł</span>
      </div>
    </main>
  );
}
