import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../Features/Auth/authSlice";  
import { selectcart, updateCartasync, deleteCartItemasync } from "../Features/Cart/cartSlice";

export default function CartPage() {
  const user = useSelector(selectuser);
  
  // 1. Just use Redux directly! No useState needed.
  const cartlist = useSelector(selectcart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    // Just tell Redux/Backend to delete it. When it finishes, 
    // Redux will automatically update 'cartlist' and re-render the screen.
    dispatch(deleteCartItemasync(id));
  };

  const handleSubtractQuantity = (item) => {
  if (item.quantity === 1) {
    // If quantity is 1 and they click subtract, just delete the item entirely
    dispatch(deleteCartItemasync(item.id));
  } else {
    // Otherwise, subtract 1 and update the backend
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    dispatch(updateCartasync(updatedItem));
  }
};

  const handleAddQuantity = (item) => {
    // Pass the whole item, update the quantity, and dispatch to backend
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateCartasync(updatedItem));
  };

  // 2. Fix the math by targeting item.product.price
  const totalAmount = cartlist.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

        <div className="space-y-6">
          {/* 3. Map over cartlist, and call the iterator 'item' so it makes logical sense */}
          {cartlist.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  // 4. Dig one level deeper to access the populated product data
                  src={item.product.thumbnail}
                  alt={item.product.description}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.product.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    Quantity: {item.quantity}
                    <button
                      onClick={() => handleAddQuantity(item)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleSubtractQuantity(item)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <FaStar className="text-yellow-500" /> {item.product.rating} ( rating)
                  </div>
                  <p className="text-sm text-gray-900 font-medium">Price: ${item.product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Cart Summary</h3>
          <div className="flex justify-between text-lg">
            <p>Total:</p>
            <p className="font-bold">${totalAmount.toFixed(2)}</p>
          </div>
          <Link to="cheakout">
            <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}