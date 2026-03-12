import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectuser } from "../Features/Auth/authSlice";

export default function ProfilePage() {
  const user = useSelector(selectuser);
  const [profile, setProfile] = useState({
    name: user.userName,
    email: user.email,
    /// do something  about password and profile picture 
    password: "password123",
    profilePic:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    if (profile.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Add save logic here (API call, etc.)
    setIsEditing(false);
    setConfirmPassword("");
    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <Link
        to="/home"
        className="absolute top-6 left-6 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
      >
        ← Back to Home
      </Link>
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Profile</h2>

        <div className="flex justify-center mb-6">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
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
              className="w-full px-4 py-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          )} */}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => {
                setIsEditing((prev) => !prev);
                setConfirmPassword("");
              }}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            )}
          </div>

          <div className="mt-6 text-center">
          </div>
        </form>
      </div>
    </div>
  );
}
