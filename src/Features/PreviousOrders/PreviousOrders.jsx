import { Link } from 'react-router-dom';

export default function PreviousOrders() {
  // Assuming 'orders' comes from your Redux store or API matching the structure you provided
  const orders = [
    {
      id: "3cff",
      items: [
        { id: "1", title: "Essence Mascara Lash Princess", quantity: 1, price: 9.99 },
        { id: "2", title: "Eyeshadow Palette with Mirror", quantity: 4, price: 19.99 },
        { id: "4", title: "Red Lipstick", quantity: 1, price: 12.99 }
      ],
      totalAmount: 102.94,
      status: "pending",
      selectedAddress: {
        name: "ssss",
        street: "1231asde 13 13",
        city: "1231ea da",
        pinCode: "asdasda"
      },
      // date: "2026-03-16" // Uncomment this to test date visibility
    },
    {
      id: "3cff",
      items: [
        { id: "1", title: "Essence Mascara Lash Princess", quantity: 1, price: 9.99 },
        { id: "2", title: "Eyeshadow Palette with Mirror", quantity: 4, price: 19.99 },
        { id: "4", title: "Red Lipstick", quantity: 1, price: 12.99 }
      ],
      totalAmount: 102.94,
      status: "pending",
      selectedAddress: {
        name: "ssss",
        street: "1231asde 13 13",
        city: "1231ea da",
        pinCode: "asdasda"
      },
      // date: "2026-03-16" // Uncomment this to test date visibility
    },{
      id: "3cff",
      items: [
        { id: "1", title: "Essence Mascara Lash Princess", quantity: 1, price: 9.99 },
        { id: "2", title: "Eyeshadow Palette with Mirror", quantity: 4, price: 19.99 },
        { id: "4", title: "Red Lipstick", quantity: 1, price: 12.99 }
      ],
      totalAmount: 102.94,
      status: "pending",
      selectedAddress: {
        name: "ssss",
        street: "1231asde 13 13",
        city: "1231ea da",
        pinCode: "asdasda"
      },
      // date: "2026-03-16" // Uncomment this to test date visibility
    },
    {
      id: "3cff",
      items: [
        { id: "1", title: "Essence Mascara Lash Princess", quantity: 1, price: 9.99 },
        { id: "2", title: "Eyeshadow Palette with Mirror", quantity: 4, price: 19.99 },
        { id: "4", title: "Red Lipstick", quantity: 1, price: 12.99 }
      ],
      totalAmount: 102.94,
      status: "pending",
      selectedAddress: {
        name: "ssss",
        street: "1231asde 13 13",
        city: "1231ea da",
        pinCode: "asdasda"
      }
      // date: "2026-03-16" // Uncomment this to test date visibility
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Previous Orders</h2>

        {orders.map((order) => (
          <Link
             to={`/orders/${order.id}`} // ✅ This was the fix!
             key={order.id}
             className="block border border-gray-200 rounded-lg mb-6 p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
           >
          <div
            key={order.id}
            className="block border border-gray-200 rounded-lg mb-6 p-6 bg-gray-50 hover:bg-white transition shadow-sm"
          >
            {/* Header: Order ID & Status */}
            <div className="mb-4 flex justify-between items-start mb-4 border-b border-gray-200 pb-4">
              <div>
                <p className="font-bold text-lg text-indigo-700">Order # {order.id}</p>
                {/* Conditional Date Rendering */}
                {order.date && (
                  <p className="text-sm text-gray-500 mt-1">Placed on: {order.date}</p>
                )}
                <p className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Items</p>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm text-gray-700 bg-white p-3 rounded-md border border-gray-100">
                  <div className="flex-1">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-gray-400 ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Selected Address Section */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-sm font-semibold text-indigo-900 mb-2 uppercase tracking-wider">Shipping Address</p>
              <div className="text-sm text-indigo-800 space-y-1">
                <p className="font-bold">{order.selectedAddress.name}</p>
                <p>{order.selectedAddress.street}</p>
                <p>{order.selectedAddress.city}, {order.selectedAddress.pinCode}</p>
              </div>
            </div>
          </div>
          </Link>

        ))}

        {orders.length === 0 && (
          <div className="text-center py-12">
             <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
             <Link to="/" className="text-indigo-600 hover:underline mt-4 inline-block">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}




