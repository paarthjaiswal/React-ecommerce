import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts, selectallproducts } from "./productListSlice";


export default function ProductList() {
    const dispatch = useDispatch();
    const productList = useSelector(selectallproducts);
    const status = useSelector((state) => state.productlist.status);
    
 useEffect(() => {
    // We check if it's 'idle' so we don't accidentally fetch data twice
    if (status === 'idle') {
      dispatch(fetchProducts());
      console.log("effects running");
    }
  }, [status, dispatch]);

if (status === 'loading') {
    return <h2>Loading groceries and beauty products...</h2>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-18 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <img
                alt={product.description}
                src={product.thumbnail}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              
              {/* Product Name */}
              <h3 className="mt-4 text-sm text-gray-700 text-left">{product.title}</h3>
              
              {/* Price & Rating Row (Aligned in One Line) */}
              <div className="flex items-center justify-between w-full">
                <p className="text-lg font-medium text-gray-900">{product.price}</p>
                <div className="flex items-center gap-1 text-gray-600">
                  <FaStar className="text-yellow-500" /> {product.rating} 
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
