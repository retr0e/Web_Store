export default function Footer() {
  return (
    <footer className='bg-black p-5 text-sm'>
      <div className='flex flex-col md:flex-row text-gray-300'>
        <div className='ml-0 md:ml-8 mt-12 mb-12 md:mr-4 w-full md:w-1/5 text-center md:text-left'>
          <h2 className='text-gray-300 text-base mb-7'>WSPARCIE</h2>
          <p>Skontaktuj się z nami</p>
          <p>Najczęstsze pytania</p>
          <p>Raty</p>
          <p>Wysyłka i dostawa</p>
          <p>Zwroty</p>
          <p>Gwarancja</p>
          <p>Rejestracja roweru</p>
          <p>Rejestracja Roval</p>
          <p>Centrum wsparcia</p>
        </div>
        <div className='mt-12 mb-12 md:mr-4 w-full md:w-1/5 text-center md:text-left'>
          <h2 className='text-gray-300 text-base mb-7'>ZASOBY</h2>
          <p>Archiwum rowerów</p>
          <p>Pokazy i wydarzenia</p>
          <p>Informacje o bezpieczeństwie</p>
          <p>Kalkulator zawieszenia</p>
          <p>Kalkulator zasięgu Turbo</p>
          <p>Podrobione produkty</p>
          <p>Zostań sprzedawcą</p>
          <p>Przewodnik po rozmiarach</p>
          <p>Program partnerski</p>
        </div>
        <div className='mt-12 mb-12 md:mr-4 w-full md:w-1/5 text-center md:text-left'>
          <h2 className='text-gray-300 text-base mb-7'>O NAS</h2>
          <p>Nasza historia</p>
          <p>Kariera</p>
          <p>Innowacje</p>
          <p>Historie</p>
          <p>Media</p>
          <p>Zrównoważony rozwój</p>
          <p>Retul</p>
          <p>Outride</p>
        </div>
        <div className='mt-12 mb-12 md:mt-24 md:ml-auto w-full md:w-auto flex justify-center md:justify-start'>
          <button className='bg-gray-500 w-full md:w-64 h-9 text-white border-2 border-white rounded-full'>
            USTAWIENIA COOKIES
          </button>
        </div>
      </div>
      <div className='flex justify-center mt-5 text-gray-300'>
        <button className='border-none bg-black text-xs mx-2'>
          POLITYKA PRYWATNOŚCI
        </button>
        <button className='border-none bg-black text-xs mx-2'>WARUNKI UŻYTKOWANIA</button>
      </div>
    </footer>
  );
}
