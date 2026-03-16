import React, { useState, useEffect } from "react";
import {
  Moon, Sun,
  ShoppingCart, User, Heart, Menu, X, Package, Home, LogOut,
  Settings, MapPin, Clipboard
} from "react-feather";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectuser } from "../Auth/authSlice";
import { selectcart } from "../Cart/cartSlice";

const categoryData = {
  Electronics: {
    Mobiles: {
      Smartphones: ["Android", "iPhone"],
      FeaturePhones: ["Nokia", "Samsung Guru"]
    },
    Laptops: {
      GamingLaptops: ["Alienware", "ROG"],
      Ultrabooks: ["MacBook", "Dell XPS"]
    }
  },
  Fashion: {
    Men: {
      Shirts: ["Casual", "Formal"],
      Jeans: ["Slim Fit", "Regular"]
    },
    Women: {
      Dresses: ["Evening", "Party"],
      Heels: ["Block", "Stiletto"]
    }
  },
  "Home & Kitchen": {
    Furniture: ["Sofas", "Tables"],
    Decor: ["Paintings", "Lamps"]
  }
};

const navLinks = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Shop by Category", href: "#", icon: Package },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const cart = useSelector(selectcart);
  const totalItemsCount = cart.reduce((total, item) => {
    return total + item.quantity;
  },0)
  const [cartCount] = useState(totalItemsCount);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSelect = (levelIndex, key) => {
    const newPath = selectedPath.slice(0, levelIndex);
    newPath.push(key);
    setSelectedPath(newPath);
  };

  const user = useSelector(selectuser);


  const renderLevels = () => {
    const levels = [];
    let currentData = categoryData;

    for (let level = 0; ; level++) {
      if (currentData === undefined || currentData === null) break;
      if (Array.isArray(currentData)) {
        levels.push(
          <div className="w-1/3" key={level}>
            <ul className="border rounded-md overflow-hidden bg-gray-50">
              {currentData.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelect(level, item)}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 transition ${selectedPath[level] === item ? "bg-violet-500 font-semibold" : ""}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
        break;
      }

      const keys = Object.keys(currentData);
      levels.push(
        <div className="w-1/3" key={level}>
          <ul className="border rounded-md overflow-hidden bg-gray-50">
            {keys.map((key) => (
              <li
                key={key}
                onClick={() => handleSelect(level, key)}
                className={`px-4 py-2 cursor-pointer hover:bg-violet-300 transition ${selectedPath[level] === key ? "bg-violet-500 font-semibold" : ""}`}
              >
                {key}
              </li>
            ))}
          </ul>
        </div>
      );

      const selectedKey = selectedPath[level];
      if (!selectedKey) break;

      currentData = currentData[selectedKey];
    }

    return levels;
  };

  const selectedItem = selectedPath.length >= 2 ? selectedPath[selectedPath.length - 1] : null;

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between w-full">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 mr-4">
              <img
                className="h-8 w-auto"
                src="https://pngtree.com/freepng/fitness-gym-logo-png_7964069.html"
                alt="ShopEase"
              />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                ShopEase
              </span>
            </div>

            {/* Desktop Nav */}


            <div className="hidden md:flex flex-1 justify-center space-x-8">
              {navLinks.map(({ label, href, icon: Icon }) => {
                const isCategoryLink = label === 'Shop by Category';

                return isCategoryLink ? (
                  <button
                    key={label}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsCategoryOpen(true);
                    }}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex items-center"
                  >
                    <Icon size={18} className="mr-1" /> {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    to={href}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex items-center"
                  >
                    <Icon size={18} className="mr-1" /> {label}
                  </Link>
                );
              })}

              <input
                type="text"
                placeholder="Search..."
                className="ml-4 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>


            {/* Actions */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Theme Toggle */}
              <div
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-6 h-10 flex flex-col items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition"
              >
                <div className={`w-5 h-5 flex items-center justify-center transition-all transform ${darkMode ? "translate-y-3" : "translate-y-0"}`}>
                  {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                </div>
              </div>

              {/* Cart */}
              <div className="relative">
                <Link to="/cart" className="p-2 rounded-full">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition">
                    <ShoppingCart size={22} />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                  <User size={22} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    {user &&<Link to="/myprofile" className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                      <User size={16} className="mr-1" /> Profile
                    </Link>}
                    {user && <Link to="/myorders" className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                      <MapPin size={16} className="mr-1" />My Orders
                    </Link>}
                    {<Link to={user ? "/auth/signout" : "/auth/signin"} className="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center">
                      <LogOut size={16} className="mr-1" /> {user ? "Sign Out" : "Sign In"}
                    </Link>}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
            <div className="flex flex-col space-y-2 px-4 py-2">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  to={href}
                  onClick={(e) => {
                    if (label === "Shop by Category") {
                      e.preventDefault();
                      setIsCategoryOpen(true);
                      setIsOpen(false);
                    }
                  }}
                  className="text-gray-600  hover:text-indigo-600 flex items-center"
                >
                  <Icon size={18} className="mr-1" /> {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Category Modal */}
      {isCategoryOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-30">
          <div className="bg-white rounded-xl p-6 shadow-2xl w-[90%] max-w-4xl relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Category</h2>

            <div className="space-y-4">
              <div className="flex space-x-4">{renderLevels()}</div>
              {selectedItem && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => alert("Search: " + selectedItem)}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                  >
                    GO to {selectedItem}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setIsCategoryOpen(false);
                setSelectedPath([]);
              }}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
