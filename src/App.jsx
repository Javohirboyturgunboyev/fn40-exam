import  { useEffect, useState } from "react";
import ProductCard from "./ProductCart";
import Cart from "./Cart";
import Modal from "./Modal";
import Loader from "./Loader";
import "./App.css";

function App() {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://json-api.uz/api/project/dessertss/desserts")
      .then((res) => res.json())
      .then((json) => {
        setDesserts(json.data);
      })
      .catch((err) => console.error("API xatosi:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: { ...product, quantity: 1 },
    }));
  };

  const increase = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 },
    }));
  };

  const decrease = (id) => {
    setCart((prev) => {
      const newQty = prev[id].quantity - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...prev[id], quantity: newQty } };
    });
  };

  const clearCart = () => {
    setCart({});
    localStorage.removeItem("cart");
  };

  const totalPrice = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div className="products-section">
        <h1 className="title">Desserts</h1>
        <div className="grid">
          {desserts.map((dessert) => (
            <ProductCard
              key={dessert.id}
              dessert={dessert}
              cart={cart}
              addToCart={addToCart}
              increase={increase}
              decrease={decrease}
            />
          ))}
        </div>
      </div>
      <Cart
        cart={cart}
        totalPrice={totalPrice}
        setShowModal={setShowModal}
      />
      {showModal && (
        <Modal
          cart={cart}
          totalPrice={totalPrice}
          clearCart={clearCart}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default App;