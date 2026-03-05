import { useEffect, useState } from "react";
import products from "../data/data_products";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import axios from "axios";

function Home() {
  const [filteredHoodies, setFilteredHoodies] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products?offset=0&limit=15").then((res) => {
      const mappedProducts = res.data.map((p) => {
        let imageUrl = "https://placehold.co/600x400";
        if (p.images && p.images.length > 0) {
          imageUrl = p.images[0].replace(/[\[\]"]/g, "");
        }
        return {
          id: p.id,
          name: p.title,
          category: p.category.name.toLowerCase(),
          price: p.price,
          image: imageUrl,
          description: p.description,
          sizes: ["S", "M", "L", "XL"]
        };
      });
      setAllProducts(mappedProducts);
      setFilteredHoodies(mappedProducts);

      const uniqueCategories = [...new Set(mappedProducts.map(p => p.category))];
      setCategories(["all", ...uniqueCategories]);
    })
      .catch((err) => console.error(err));
  }, []);

  const filterProducts = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilteredHoodies(allProducts);
    } else {
      setFilteredHoodies(allProducts.filter((p) => p.category === category));
    }
  };

  return (
    <>
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="mt-4 relative w-full h-[75vh] flex items-center justify-center">

        <img
          src="/cover.jpeg"
          alt="Cover"
          className="sm:w-[65%] w-[100%] h-[90%] object-cover rounded-3xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className=" text-center text-white px-4 mt-50"
          >
            {/* //add a responsize design for the text */}
            <h1 className="text-5xl md:text-5xl font-extrabold uppercase tracking-[5px] mb-4">
              Clothes Season
            </h1>

            <p className="text-sm md:text-1xl mb-8 text-gray-200">
              Elevate your street style <br /> with our premium collection.
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase px-8 py-3 rounded-full text-lg shadow-xl transition cursor-pointer"
              onClick={() => {
                document
                  .getElementById("products-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>

      </div>
      

      {/* Filter Section */}
      <div id="products-section" className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-center mb-5">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2.5 text-sm font-medium capitalize rounded-full border transition cursor-pointer ${activeCategory === category
                  ? "bg-gray-900 text-white border-gray-900 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 shadow-sm"
                  }`}
                onClick={() => filterProducts(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap -mx-3">
          {filteredHoodies.length > 0 ? (
            filteredHoodies.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="w-full text-center py-12">
              <h3 className="text-xl text-gray-500">
                No products found in this category.
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
