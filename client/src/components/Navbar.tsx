import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { isLoggedIn, user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // ✅ SCROLL FUNCTION
  const handleScroll = (id: string) => {

    if (location.pathname !== "/") {

      navigate("/");

      setTimeout(() => {

        const section = document.getElementById(id);

        section?.scrollIntoView({
          behavior: "smooth",
        });

      }, 200);

    } else {

      const section = document.getElementById(id);

      section?.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  // ✅ LOGOUT
  const handleLogout = async () => {

    try {

      await logout();

      setIsOpen(false);

      navigate("/login");

      window.location.reload();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/30"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 70,
          mass: 1,
        }}
      >

        {/* LOGO */}
        <Link to="/">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-8.5 w-auto"
          />
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">

          {/* ✅ HOME */}
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="hover:text-pink-300 transition"
          >
            Home
          </button>

          {/* ✅ GENERATE */}
          <Link
            to="/generate"
            className="hover:text-pink-300 transition"
          >
            Generate
          </Link>

          {/* ✅ FEATURES */}
          <button
            onClick={() => handleScroll("features")}
            className="hover:text-pink-300 transition"
          >
            Features
          </button>

          {/* ✅ TESTIMONIALS */}
          <button
            onClick={() => handleScroll("testimonials")}
            className="hover:text-pink-300 transition"
          >
            Testimonials
          </button>

          {/* ✅ PRICING */}
          <button
            onClick={() => handleScroll("pricing")}
            className="hover:text-pink-300 transition"
          >
            Pricing
          </button>

          {/* ✅ MY GENERATIONS */}
          {
            isLoggedIn && (
              <Link
                to="/my-generation"
                className="hover:text-pink-300 transition"
              >
                My Generations
              </Link>
            )
          }

          {/* ✅ CONTACT */}
          <button
            onClick={() => handleScroll("contact")}
            className="hover:text-pink-300 transition"
          >
            Contact us
          </button>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">

          {
            isLoggedIn ? (

              <div className="relative group">

                <button className="rounded-full size-8 bg-white/20 border-2 border-white/10">

                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}

                </button>

                {/* DROPDOWN */}
                <div className="absolute hidden group-hover:block top-6 right-0 pt-4">

                  <button
                    onClick={handleLogout}
                    className="bg-white/20 border-2 border-white/10 px-5 py-1.5 rounded hover:bg-white/30 transition"
                  >
                    Logout
                  </button>

                </div>

              </div>

            ) : (

              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full"
              >
                Get Started
              </button>

            )
          }

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden"
          >

            <Menu
              size={26}
              className="active:scale-90 transition"
            />

          </button>

        </div>

      </motion.nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-500 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* ✅ HOME */}
        <button
          onClick={() => {

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });

            setIsOpen(false);
          }}
        >
          Home
        </button>

        {/* ✅ GENERATE */}
        <Link
          onClick={() => setIsOpen(false)}
          to="/generate"
        >
          Generate
        </Link>

        {/* ✅ FEATURES */}
        <button
          onClick={() => handleScroll("features")}
        >
          Features
        </button>

        {/* ✅ TESTIMONIALS */}
        <button
          onClick={() => handleScroll("testimonials")}
        >
          Testimonials
        </button>

        {/* ✅ PRICING */}
        <button
          onClick={() => handleScroll("pricing")}
        >
          Pricing
        </button>

        {/* ✅ MY GENERATIONS */}
        {
          isLoggedIn && (

            <Link
              onClick={() => setIsOpen(false)}
              to="/my-generation"
            >
              My Generations
            </Link>

          )
        }

        {/* ✅ CONTACT */}
        <button
          onClick={() => handleScroll("contact")}
        >
          Contact us
        </button>

        {/* ✅ LOGIN / LOGOUT */}
        {
          isLoggedIn ? (

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-pink-600 rounded-full hover:bg-pink-700 transition"
            >
              Logout
            </button>

          ) : (

            <Link
              onClick={() => setIsOpen(false)}
              to="/login"
            >
              Login
            </Link>

          )
        }

        {/* ✅ CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 flex items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md"
        >

          <X size={28} />

        </button>

      </div>
    </>
  );
}