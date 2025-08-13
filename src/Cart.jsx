

function Cart({ cart, totalPrice, setShowModal }) {
  const items = Object.values(cart);

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart ({items.length})</h2>
      {items.length === 0 ? (
        <div className="empty-cart">
          <img src="../public/images/illustration-empty-cart.svg" alt="Empty Cart" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="btn-confirm" onClick={() => setShowModal(true)}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
