import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import FooterSection from '../Features/Footer/FooterSection'
import { selectCurrentOrder } from '../Features/order/orderSlice'
import { useSelector,useDispatch } from 'react-redux'
import { resetCartasync } from '../Features/Cart/cartSlice'



export default function OrderSucessPage() {
    const currentobj = useSelector(selectCurrentOrder);
    /// ffix this later
    useEffect(()=>{
        useSelector(resetCartasync())
        console.log(currentobj);
    },[currentobj])
  return (
    <>
      <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Order placed , Order ID : {currentobj.id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
           Order Detailes : {currentobj.totalAmount}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back home
            </Link>
            
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  )
}
