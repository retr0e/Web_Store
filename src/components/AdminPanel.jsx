import { useState } from "react";

function AdminPanel() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductColors] = useState("");
  const [productSizes, setProductSizes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Wysłanie danych produktu do serwera i zapisanie w bazie danych
      const response = await fetch("http://localhost:3000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          price: productPrice,
          description: productDescription,
          images: productImages,
          colors: productColors.split(",").map((color) => color.trim()),
          sizes: productSizes.split(",").map((size) => size.trim()),
        }),
      });
      if (response.ok) {
        setSuccessMessage("Produkt został dodany pomyślnie.");
      } else {
        setErrorMessage("Wystąpił błąd podczas dodawania produktu.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Wystąpił błąd podczas dodawania produktu.");
    }
  };

  return (
    <div className='admin-panel bg-gray-100 p-8'>
      <h2 className='text-2xl mb-4'>Panel administracyjny</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2'>Nazwa produktu:</label>
          <input
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Cena produktu:</label>
          <input
            type='text'
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Opis produktu:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Zdjęcia produktu:</label>
          <input
            type='file'
            multiple
            onChange={(e) => setProductImages(Array.from(e.target.files))}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Dostępne kolory (oddzielone przecinkami):</label>
          <input
            type='text'
            value={productColors}
            onChange={(e) => setProductColors(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>
            Dostępne rozmiary (oddzielone przecinkami):
          </label>
          <input
            type='text'
            value={productSizes}
            onChange={(e) => setProductSizes(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Dodaj produkt
        </button>
      </form>
      {successMessage && <p className='text-green-500 mt-4'>{successMessage}</p>}
      {errorMessage && <p className='text-red-500 mt-4'>{errorMessage}</p>}
    </div>
  );
}

export default AdminPanel;
