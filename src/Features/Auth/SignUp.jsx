import { use, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { creatuserasyc ,selectuser} from "./authSlice";
import { useDispatch , useSelector } from "react-redux";


export default function SignUp() {
  let user = useSelector(selectuser);
  let dispatch = useDispatch();
  const onSubmit = (e) => {
    // navigate("/auth/verify");
    console.log(e);
    dispatch(creatuserasyc({email:e.email,password:e.password,userName:e.userName}));
  };


  const {register,handleSubmit,formState : {errors},} = useForm();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {user && <Navigate to='/' replace={true}></Navigate>}
      <Link
        to="/"
        className="absolute top-6 left-6 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        ← Back to Home
      </Link>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">username</label>
            <input
              id="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("userName",{
                required : "username is required",
                
              })}
              placeholder = "xyz67_"
            />
            {errors.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>
          )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email",{
                required : "email is required",
                pattern :{
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format"},
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
              required: "Password is required",
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmpassword"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("confirmpassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
              validate: (value, formValues) => value === formValues.password || 'password not matching'
             
            })}
            placeholder = "••••••••"
            />
            {errors.confirmpassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmpassword.message}</p>
          )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
          >
            Verify Email
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/signin" className="text-indigo-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );

}