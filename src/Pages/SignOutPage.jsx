import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// Adjust this import path to match exactly where your authSlice is!
import { selectuser, signOutUserAsync } from "../Features/Auth/authSlice"; 

export default function SignOut() {
  const dispatch = useDispatch();
  const user = useSelector(selectuser); 

  // 1. As soon as this component mounts, fire the sign-out Thunk
  useEffect(() => {
    dispatch(signOutUserAsync(user));
  }, [dispatch]);

  // 2. Watch the Redux state. Once 'user' becomes null, redirect immediately.
  // Using replace={true} ensures they can't hit the "Back" button to return here.
  if (!user) {
    return <Navigate to="/auth/signin" replace={true} />;
  }

  // 3. Show a brief loading screen while the API processes the sign out
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Signing you out...</h2>
        <p className="text-gray-500 text-sm">Please wait a moment.</p>
      </div>
    </div>
  );
}