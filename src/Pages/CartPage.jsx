import { useState } from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../Features/Auth/authSlice";  
import { selectcart ,updateCartasync,deleteCartItemasync} from "../Features/Cart/cartSlice";

const initialCart = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: 48,
    rating: 4.5,
    reviews: 120,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: 35,
    rating: 4.8,
    reviews: 89,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive green insulated bottle with a screw top.',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: 14,
    rating: 4.2,
    reviews: 45,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Stack of white paper refill sheets for journal.',
    quantity: 3,
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: 65,
    rating: 4.9,
    reviews: 210,
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Aluminum mechanical pencil with knurled grip.',
    quantity: 1,
  }
];


export default function CartPage() {
  const user = useSelector(selectuser);
  const cartlist = useSelector(selectcart)
  const dispatch = useDispatch();
  const [cart, setCart] = useState(cartlist);
  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
    // make this dispatch work 
    dispatch(deleteCartItemasync(id));
  };
  const handleAddQuantity = (id) => {
    console.log("handle add is run"+id)
  setCart(cart.map(item => {
    // 1. Find the specific item the user clicked
    if (item.id === id) {
      // 2. Create a brand new object with the +1 quantity
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      
      // 3. Dispatch the NEW item to Redux/Backend
      dispatch(updateCartasync(updatedItem));
      
      // 4. Return the new item to update your local React state
      return updatedItem;
    }
    
    // 5. For all other items, return them exactly as they are
    return item;
  }));
};

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h2>

        <div className="space-y-6">
          {cart.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={product.thumbnail}
                  alt={product.description}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    Quantity: {product.quantity}
                    <button
                      onClick={() => handleAddQuantity(product.id)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <FaStar className="text-yellow-500" /> {product.rating} ( rating)
                  </div>
                  <p className="text-sm text-gray-900 font-medium">Price: ${product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(product.id)}
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
          <Link to ="cheakout"><button
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
          >
            Proceed to Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
