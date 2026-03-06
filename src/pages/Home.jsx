import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import {hoodies} from "../data/data_products";

function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", ...new Set(hoodies.map((p) => p.category))];

  const filteredHoodies =
    activeCategory === "all"
      ? hoodies
      : hoodies.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <div className="mt-4 relative w-full h-[75vh] flex items-center justify-center">
        <img
          src="/cover.jpeg"
          alt="Cover"
          className="sm:w-[65%] w-full h-[90%] object-cover rounded-3xl"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white px-4 mt-50"
          >
            <h1 className="text-5xl font-extrabold uppercase tracking-[5px] mb-4">
              Hoodies Season
            </h1>

            <p className="text-sm md:text-xl mb-8 text-gray-200">
              Elevate your street style <br /> with our premium collection.
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white font-bold uppercase px-8 py-3 rounded-full shadow-xl"
              onClick={() =>
                document
                  .getElementById("products-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div id="products-section" className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-5 gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border capitalize ${
                activeCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="flex flex-wrap -mx-3">
          {filteredHoodies.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;