
import { useState } from "react";
import { Link } from "react-router-dom"; // Fixed 'react-router' to 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { selectuser, updateUserAsync } from "../Features/Auth/authSlice"; // Ensure path is correct

export default function ProfilePage() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  
  // 1. Load the initial state securely from Redux
  const [profile, setProfile] = useState({
    name: user?.userName || "",
    email: user?.email || "",
    addresses: user?.addresses ? [...user.addresses] : [],
    profilePic: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  // 2. Handle standard inputs (Name, Email)
  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 3. Handle deep array inputs (Addresses)
  const handleAddressChange = (e, index) => {
    const updatedAddresses = [...profile.addresses];
    updatedAddresses[index] = { 
      ...updatedAddresses[index], 
      [e.target.name]: e.target.value 
    };
    setProfile({ ...profile, addresses: updatedAddresses });
  };

  // 4. Handle deleting an address
  const handleRemoveAddress = (indexToRemove) => {
    const filteredAddresses = profile.addresses.filter((_, index) => index !== indexToRemove);
    setProfile({ ...profile, addresses: filteredAddresses });
  };

  // 5. Dispatch the Thunk to save to DB
  const handleSave = () => {
    const updatedUserData = {
      ...user, // Keep ID, password, etc. intact
      userName: profile.name,
      email: profile.email,
      addresses: profile.addresses,
    };

    dispatch(updateUserAsync(updatedUserData));
    setIsEditing(false);
    alert("Profile successfully updated!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <Link
        to="/"
        className="absolute top-6 left-6 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        ← Back to Home
      </Link>
      
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* User Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 disabled:bg-gray-50"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 disabled:bg-gray-50"
                disabled={!isEditing}
              />
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Addresses Section */}
          <div>
            <h3 className="text-lg font-semibold leading-7 text-gray-900">Addresses</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 mb-4">
              Manage your saved delivery addresses.
            </p>

            <div className="space-y-4">
              {profile.addresses.map((address, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  )}

                  {!isEditing ? (
                    // Display Mode
                    <div className="flex justify-between items-center pr-10">
                      <div>
                        <p className="font-semibold text-gray-900">{address.name}</p>
                        <p className="text-sm text-gray-500">{address.street}</p>
                        <p className="text-sm text-gray-500">{address.city}, {address.state} - {address.pinCode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-500">{address.phone}</p>
                      </div>
                    </div>
                  ) : (
                    // Edit Mode
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      <input type="text" name="name" value={address.name} onChange={(e) => handleAddressChange(e, index)} placeholder="Full Name" className="border px-3 py-1.5 rounded-md text-sm" />
                      <input type="text" name="phone" value={address.phone} onChange={(e) => handleAddressChange(e, index)} placeholder="Phone Number" className="border px-3 py-1.5 rounded-md text-sm" />
                      <input type="text" name="street" value={address.street} onChange={(e) => handleAddressChange(e, index)} placeholder="Street Address" className="border px-3 py-1.5 rounded-md text-sm col-span-1 sm:col-span-2" />
                      <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(e, index)} placeholder="City" className="border px-3 py-1.5 rounded-md text-sm" />
                      <div className="flex gap-2">
                        <input type="text" name="state" value={address.state} onChange={(e) => handleAddressChange(e, index)} placeholder="State" className="border px-3 py-1.5 rounded-md text-sm w-1/2" />
                        <input type="text" name="pinCode" value={address.pinCode} onChange={(e) => handleAddressChange(e, index)} placeholder="PIN" className="border px-3 py-1.5 rounded-md text-sm w-1/2" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => {
                // If canceling, reset the state back to the original Redux data
                if (isEditing) {
                  setProfile({
                    name: user.userName,
                    email: user.email,
                    addresses: [...user.addresses],
                    profilePic: profile.profilePic
                  });
                }
                setIsEditing(!isEditing);
              }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}