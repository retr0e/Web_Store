import { useState } from "react";

function AdminPanel() {
  // State for product management
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productColors, setProductColors] = useState("");
  const [productSizes, setProductSizes] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State for user management
  const [userId, setUserId] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userActionMessage, setUserActionMessage] = useState("");

  // Handler for adding a product
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
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

  // Handler for adding a user
  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: userLogin,
          password: userPassword,
        }),
        credentials: "include", // Include credentials in the request
      });
      if (response.ok) {
        setUserActionMessage("Użytkownik został dodany pomyślnie.");
      } else {
        setUserActionMessage("Wystąpił błąd podczas dodawania użytkownika.");
      }
    } catch (error) {
      console.error("Error:", error);
      setUserActionMessage("Wystąpił błąd podczas dodawania użytkownika.");
    }
  };

  // Handler for editing a user
  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/edit-user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: userLogin,
          password: userPassword,
        }),
        credentials: "include",
      });
      if (response.ok) {
        setUserActionMessage("Dane użytkownika zostały zaktualizowane.");
      } else {
        setUserActionMessage("Wystąpił błąd podczas edycji użytkownika.");
      }
    } catch (error) {
      console.error("Error:", error);
      setUserActionMessage("Wystąpił błąd podczas edycji użytkownika.");
    }
  };

  // Handler for deactivating a user
  const handleDeactivateUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/deactivate-user/${userId}`, {
        method: "PUT",
        credentials: "include",
      });
      if (response.ok) {
        setUserActionMessage("Użytkownik został dezaktywowany.");
      } else {
        setUserActionMessage("Wystąpił błąd podczas dezaktywacji użytkownika.");
      }
    } catch (error) {
      console.error("Error:", error);
      setUserActionMessage("Wystąpił błąd podczas dezaktywacji użytkownika.");
    }
  };

  return (
    <div className='admin-panel bg-gray-100 p-8'>
      <h2 className='text-2xl mb-4'>Panel administracyjny</h2>

      {/* Product Management Form */}
      <form onSubmit={handleProductSubmit} className='mb-8'>
        <h3 className='text-xl mb-4'>Dodaj produkt</h3>
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

      {/* User Management Forms */}
      <h3 className='text-xl mb-4'>Zarządzanie użytkownikami</h3>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className='mb-8'>
        <h4 className='text-lg mb-4'>Dodaj użytkownika</h4>
        <div className='mb-4'>
          <label className='block mb-2'>Login:</label>
          <input
            type='text'
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Hasło:</label>
          <input
            type='password'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
          Dodaj użytkownika
        </button>
      </form>

      {/* Edit User Form */}
      <form onSubmit={handleEditUser} className='mb-8'>
        <h4 className='text-lg mb-4'>Edytuj użytkownika</h4>
        <div className='mb-4'>
          <label className='block mb-2'>ID Użytkownika:</label>
          <input
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Nowy login:</label>
          <input
            type='text'
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2'>Nowe hasło:</label>
          <input
            type='password'
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <button type='submit' className='bg-yellow-500 text-white px-4 py-2 rounded'>
          Edytuj użytkownika
        </button>
      </form>

      {/* Deactivate User Form */}
      <form onSubmit={handleDeactivateUser} className='mb-8'>
        <h4 className='text-lg mb-4'>Dezaktywuj użytkownika</h4>
        <div className='mb-4'>
          <label className='block mb-2'>ID Użytkownika:</label>
          <input
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full'
          />
        </div>
        <button type='submit' className='bg-red-500 text-white px-4 py-2 rounded'>
          Dezaktywuj użytkownika
        </button>
      </form>

      {userActionMessage && <p className='text-blue-500 mt-4'>{userActionMessage}</p>}
    </div>
  );
}

export default AdminPanel;
