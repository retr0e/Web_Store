import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Function to dynamically import images
const importImage = async (path) => {
  try {
    const image = await import(`${path}`);
    return image.default;
  } catch (err) {
    console.error("Error importing image:", err);
    return null;
  }
};

export default function ViewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className='grid max-w-fit mx-auto bg-[#fafafa] w-full justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pb-[23%]'>
      {products.map((product) => {
        const imagePath = `${product.location}/${product.file_name}`;

        return (
          <div key={product.id_product} className='relative p-10 item flex flex-col'>
            <Link to={`/store/${product.id_product}`}>
              <AsyncImage path={imagePath} alt={product.name} />
            </Link>
            <h2>{product.name}</h2>
            <span className='p-2 font-bold self-end'>
              {(product.price / 100).toLocaleString("pl-PL", {
                style: "currency",
                currency: "PLN",
              })}
            </span>
          </div>
        );
      })}
    </main>
  );
}

// eslint-disable-next-line react/prop-types
function AsyncImage({ path, alt }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      const image = await importImage(path);
      setSrc(image);
    };

    loadImage();
  }, [path]);

  if (!src) {
    return <div className='w-full mb-2 bg-gray-200 h-48'>Image not available</div>;
  }

  return <img src={src} alt={alt} className='w-full mb-2' />;
}
