import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";
import { useState } from "react";

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="text-2xl font-extrabold tracking-wider text-white no-underline" style={{ fontFamily: 'Impact, sans-serif' }}>
            Clothes<span className="text-blue-500">STORE</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors no-underline ${isActive ? 'text-white font-bold' : 'text-gray-300 hover:text-white'}`
              }
            >
              Home
            </NavLink>
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition no-underline"
            >
              🛒 Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium no-underline ${isActive ? 'text-white font-bold' : 'text-gray-300'}`
              }
            >
              Home
            </NavLink>
            <Link
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-gray-300 no-underline"
            >
              🛒 Cart ({cartCount})
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
