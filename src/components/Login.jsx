export default function Login() {
  return (
    <main className='bg-gray-50 h-400'>
      <div className='flex flex-col items-center py-[20%]'>
        <h1 className='font-bold text-3xl'>LOGOWANIE</h1>
        <p className='mt-6'>
          <label htmlFor='login' className='font-bold'>
            Login:
          </label>
          <input
            type='text'
            name='login'
            id='login'
            className='bg-gray-300 rounded-full px-4 py-2 ml-4 w-72'
          />
        </p>
        <p className='mt-4'>
          <label htmlFor='password' className='font-bold'>
            Hasło:
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='bg-gray-300 rounded-full px-4 py-2 ml-4 w-72'
          />
        </p>
        <button className='bg-red-500 rounded-full px-4 py-2 text-white mt-8'>
          Zaloguj
        </button>
      </div>
    </main>
  );
}
