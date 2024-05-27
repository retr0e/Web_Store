/* eslint-disable react/prop-types */

function OrderSummary({ cartItems }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + 20;

  return (
    <main className='h-auto bg-gray-100 p-8'>
      <div className='flex flex-col items-center'>
        <h2 className='text-2xl lg:text-3xl font-bold text-center mb-4'>Podsumowanie</h2>
        <div className='w-full md:w-3/4'>
          <table className='table-fixed w-full mb-4'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Produkt</th>
                <th className='px-4 py-2'>Cena</th>
                <th className='px-4 py-2'>Ilość</th>
                <th className='px-4 py-2'>Łącznie</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className='px-4 py-2'>
                    <div className='flex flex-col sm:flex-row items-center'>
                      <img
                        className='w-24 h-24 object-cover rounded-lg mr-0 sm:mr-4 mb-4 sm:mb-0'
                        src={item.image}
                        alt={item.name}
                      />
                      <h2 className='font-bold mb-2 text-center sm:text-left'>
                        {item.name}
                      </h2>
                    </div>
                  </td>
                  <td className='px-4 py-2 text-center'>{item.price.toFixed(2)} zł</td>
                  <td className='px-4 py-2 text-center'>{item.quantity}</td>
                  <td className='px-4 py-2 text-center'>
                    {(item.price * item.quantity).toFixed(2)} zł
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='summary bg-gray-200 rounded-lg w-full p-4'>
            <div className='flex justify-between items-center mb-2'>
              <p>Suma częściowa:</p>
              <p>{subtotal.toFixed(2)} zł</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <p>Rodzaj wysyłki:</p>
              <p>20.00 zł</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <p>Kod rabatowy:</p>
              <p>- 0.00 zł</p>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <p>Łączna suma:</p>
              <p>{total.toFixed(2)} zł</p>
            </div>
          </div>
          {/* <div className='flex justify-center mt-8'>
            <button className='checkout bg-black text-white rounded-lg px-4 py-2 w-[80%]'>
              Przejdź do płatności
            </button>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default OrderSummary;
