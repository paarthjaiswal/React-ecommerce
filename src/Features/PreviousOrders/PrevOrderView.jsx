import { FaStar } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

// Note: In your real app, you will likely pull this from Redux using useSelector!
const orders = [
  {
    "id": "3cff",
    "items": [
      {
        "id": "1",
        "title": "Essence Mascara Lash Princess",
        "price": 9.99,
        "rating": 2.56,
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
        "quantity": 1,
        "reviews": [{}, {}, {}] // Condensed for brevity, length = 3
      },
      {
        "id": "2",
        "title": "Eyeshadow Palette with Mirror",
        "price": 19.99,
        "rating": 2.86,
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
        "quantity": 4,
        "reviews": [{}, {}, {}] 
      }
    ],
    "totalAmount": 102.93999999999998,
    "status": "pending",
    "selectedAddress": {
      "name": "ssss",
      "street": "1231asde 13 13",
      "city": "1231ea da",
      "pinCode": "asdasda"
    },
    // "date": "2026-03-16"
  }
];

export default function PrevOrderView() {
  const { id } = useParams();
  
  // Find the specific order based on the URL parameter
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-lg">
        Order not found.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Order Header */}
        <div className="mb-8 p-6 bg-gray-50 border rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Summary</h2>
              <p className="text-sm text-gray-600">Order ID: <span className="font-medium text-gray-900">{order.id}</span></p>
              {order.date && <p className="text-sm text-gray-600">Date Placed: {order.date}</p>}
              
              {/* FIXED: Formatted the address object safely */}
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-semibold block text-gray-800">Delivered To:</span>
                <p>{order.selectedAddress.name}</p>
                <p>{order.selectedAddress.street}, {order.selectedAddress.city}</p>
                <p>PIN: {order.selectedAddress.pinCode}</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold uppercase ${
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
              {/* FIXED: Formatted total amount to 2 decimal places */}
              <p className="text-sm text-gray-600">Total Price:</p>
              <p className="text-2xl font-bold text-indigo-600">${order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">Items in this Order</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* FIXED: Changed order.products to order.items */}
          {order.items.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block border rounded-lg p-3 hover:shadow-lg transition bg-white">
              <img
                alt={product.title} // FIXED: Changed from imageAlt
                src={product.thumbnail} // FIXED: Changed from imageSrc
                className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-90"
              />
              <h3 className="mt-3 text-sm font-semibold text-gray-800 truncate">{product.title}</h3> 
              
              {/* Quantity */}
              <p className="text-sm text-gray-600 mt-1">Qty: {product.quantity}</p>

              {/* Price and Rating */}
              <div className="mt-3 flex items-center justify-between border-t pt-2">
                <p className="text-base font-bold text-gray-900">${product.price}</p>
                
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaStar className="text-yellow-500 mb-0.5" />
                  {/* FIXED: Added ?.length to handle the array of reviews safely */}
                  {product.rating} ({product.reviews?.length || 0})
                </div>
              </div>
            </Link>
          ))}
          
        </div>
      </div>
    </div>
  );
}