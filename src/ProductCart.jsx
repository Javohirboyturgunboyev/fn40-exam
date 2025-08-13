

function ProductCard({ dessert, cart, addToCart, increase, decrease }) {
  const count = cart[dessert.id]?.quantity || 0;

  return (
    <div className="card">
      <img
        src={dessert.image.desktop}
        alt={dessert.name}
        className="card-img"
      />
      {count === 0 ? (
        <button className="btn" onClick={() => addToCart(dessert)}>
          
          🛒 Add to Cart
        </button>
      ) : (
        <div className="qty-controls">
          <button onClick={() => decrease(dessert.id)}>-</button>
          <span>{count}</span>
          <button onClick={() => increase(dessert.id)}>+</button>
        </div>
      )}
      <p className="category">{dessert.category}</p>
      <h3 className="name">{dessert.name}</h3>
      <p className="price">${dessert.price.toFixed(2)}</p>
    </div>
  );
}

export default ProductCard;
