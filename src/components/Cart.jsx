import { useEffect, useState } from "react";
import examplePhoto from "../Koncepcyjne_zdjecia/rower_list_3.webp";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrderSummary, setShowOrderSummary] = useState(false); // Nowy stan

  useEffect(() => {
    fetch("http://localhost:3000/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for handling cookies
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const updateQuantity = (id, increment) => {
    fetch("http://localhost:3000/update-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for handling cookies
      body: JSON.stringify({ id, increment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSummaryClick = () => {
    setShowOrderSummary(true);
  };

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (showOrderSummary) {
    // Jeśli showOrderSummary jest true, wyświetl OrderSummary
    return <OrderSummary cartItems={cartItems} />;
  }

  return (
    <main className='h-500 bg-gray-50 pb-[20%] pt-[10%]'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 px-4'>
        <div className='md:col-span-3'>
          <h2 className='text-2xl lg:text-3xl font-bold text-center'>KOSZYK</h2>
          {cartItems.length === 0 ? (
            <p className='text-center mt-4'>Koszyk jest pusty</p>
          ) : (
            <table className='table-fixed w-full mt-4'>
              <thead>
                <tr>
                  <th className='px-4 py-2'>Produkt</th>
                  <th className='px-4 py-2'>Cena</th>
                  <th className='px-4 py-2'>Ilość</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className='px-4 py-2'>
                      <div className='flex flex-col sm:flex-row items-center'>
                        <img
                          className='w-24 h-24 object-cover rounded-lg mr-0 sm:mr-4 mb-4 sm:mb-0'
                          src={item.image || examplePhoto}
                          alt={item.name}
                        />
                        <h2 className='font-bold mb-2 text-center sm:text-left'>
                          {item.name}
                        </h2>
                      </div>
                    </td>
                    <td className='px-4 py-2 text-center'>{item.price.toFixed(2)} zł</td>
                    <td className='px-4 py-2 text-center'>
                      <div className='flex items-center justify-center'>
                        <button
                          className='px-2 py-1 bg-gray-200 rounded-md'
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <p className='px-2 py-1 bg-gray-50 mx-2'>{item.quantity}</p>
                        <button
                          className='px-2 py-1 bg-gray-200 rounded-md'
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className='flex justify-center mt-8'>
            <button
              className='checkout bg-black text-white rounded-lg px-4 py-2 w-[80%]'
              onClick={handleSummaryClick}
            >
              Przejdź do podsumowania
            </button>
          </div>
        </div>

        <div className='md:col-span-1 flex flex-col items-center mr-10'>
          <div className='w-full md:w-80'>
            <h2 className='text-xl font-bold mt-8 md:mt-0 text-center'>PODSUMOWANIE</h2>
            <div className='summary bg-red-300 rounded-lg w-full h-36 flex flex-col justify-center items-center mt-4 px-4 py-2'>
              <div className='w-full flex justify-between items-center mb-2'>
                <p>Suma częściowa:</p>
                <p>
                  {cartItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}{" "}
                  zł
                </p>
              </div>
              <div className='w-full flex justify-between items-center mb-2'>
                <p>Rodzaj wysyłki:</p>
                <p>20.00 zł</p>
              </div>
              <div className='w-full flex justify-between items-center mb-2'>
                <p>Kod rabatowy:</p>
                <p>- 0.00 zł</p>
              </div>
              <div className='w-full flex justify-between items-center mb-2'>
                <p>Łączna suma:</p>
                <p>
                  {(
                    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
                    20
                  ).toFixed(2)}{" "}
                  zł
                </p>
              </div>
            </div>
            {/* <div className='flex justify-center mt-8'>
              <button className='checkout bg-black text-white rounded-lg px-4 py-2 w-[80%]'>
                Przejdź do płatności
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
