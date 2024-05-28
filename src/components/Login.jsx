import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        { login, password },
        { withCredentials: true }
      );
      alert(response.data);
    } catch (error) {
      alert("Login failed");
    }
  };

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
            value={login}
            onChange={(e) => setLogin(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <button
          className='bg-red-500 rounded-full px-4 py-2 text-white mt-8'
          onClick={handleLogin}
        >
          Zaloguj
        </button>
      </div>
    </main>
  );
}
