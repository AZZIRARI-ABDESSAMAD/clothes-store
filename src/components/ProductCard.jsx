import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ y: -10 }}
            className="w-full sm:w-1/2 lg:w-1/4 p-3"
        >
            <div className="h-[460px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300flex flex-col">

                <Link to={`/product/${product.id}`} className="flex flex-col h-full">

                    {/* IMAGE */}
                    <div className="h-[80%] overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            src={product.image}
                            className="w-full h-full object-cover"
                            alt={product.name}
                        />
                    </div>

                    {/* CONTENT */}
                    <div className=" bg-black h-[10%] p-4 flex flex-col justify-between flex-1">

                        <h1 className="text-white font-extrabold text-sm line-clamp-2">
                            {product.name}
                        </h1>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-green-400 font-bold text-lg">
                                {product.price} Dh
                            </span>

                            <span className="text-xs px-3 py-1.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition">
                                View Details
                            </span>
                        </div>

                    </div>

                </Link>
            </div>
        </motion.div>
    );
};

export default ProductCard;