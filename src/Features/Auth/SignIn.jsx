import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link,Navigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { selectuser, seleerror ,checkUserAsync} from "./authSlice";


export default function SignIn() {
  const dispatch = useDispatch()
  const error = useSelector(seleerror)
  const user = useSelector(selectuser)


  const handleSignIn = (e) => {
    console.log( "signin logs : "+e + {email : e.email,password : e.password});
    dispatch( checkUserAsync({email : e.email,password : e.password}))
  };

  const {register,handleSubmit,formState : {errors},} = useForm();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
       {user && <Navigate to='/' replace={true}></Navigate>}
      <Link
        to="/"
        className="absolute top-6 left-6 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        ← Back to Home
      </Link>

      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In to Your Account</h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email",{
                required : "email is required",
                pattern : {
                  value : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message : "Invalid email format"
                },
              })}
              placeholder = "example@gmail.com"
            />
            {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password", {
              required: "password is needed",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              })}
            placeholder = "••••••••"
            />
            {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
           {error && (
                  <p className="text-red-500">{error.message}</p>
                )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          <button
            id="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
