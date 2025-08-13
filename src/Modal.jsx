

function Modal({ cart, totalPrice, clearCart, setShowModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Confirmed 🎉</h2>
        <ul>
          {Object.values(cart).map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button
          className="btn"
          onClick={() => {
            clearCart();
            setShowModal(false);
          }}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default Modal;
