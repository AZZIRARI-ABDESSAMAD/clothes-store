import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then(res => {
                const p = res.data;
                let imageUrl = "https://placehold.co/600x400";
                if (p.images && p.images.length > 0) {
                    imageUrl = p.images[0].replace(/[\[\]"]/g, '');
                }
                const mappedProduct = {
                    id: p.id,
                    name: p.title,
                    category: p.category.name.toLowerCase(),
                    price: p.price,
                    image: imageUrl,
                    description: p.description,
                    sizes: ["S", "M", "L", "XL"]
                };
                setProduct(mappedProduct);

                return axios.get(`https://api.escuelajs.co/api/v1/categories/${p.category.id}/products?limit=6&offset=0`);
            })
            .then(res => {
                const related = res.data.map(p => {
                    let imageUrl = "https://placehold.co/600x400";
                    if (p.images && p.images.length > 0) {
                        imageUrl = p.images[0].replace(/[\[\]"]/g, '');
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
                }).filter(p => p.id !== parseInt(id)).slice(0, 6);
                setRelatedProducts(related);
                setSelectedSize('');
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="max-w-7xl mx-auto px-4 py-20 text-center"><h2 className="text-2xl font-bold">Loading...</h2></div>;
    }

    if (!product) {
        return <div className="max-w-7xl mx-auto px-4 py-20 text-center"><h2 className="text-2xl font-bold">Product not found</h2></div>;
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
        }
        dispatch(addToCart({ product, size: selectedSize }));
        alert('Added to cart!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <motion.img
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[85%] object-cover rounded-2xl shadow-2xl"
                    />
                </div>
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{product.name}</h1>
                        <h3 className="text-2xl text-green-500 font-bold mb-6">{product.price} Dh</h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{product.description}</p>

                        <div className="mb-6">
                            <h5 className="text-md font-semibold mb-3">Select Size:</h5>
                            <div className="inline-flex gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition cursor-pointer ${selectedSize === size
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={`w-full py-3 rounded-full text-lg font-bold transition cursor-pointer ${selectedSize
                                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            onClick={handleAddToCart}
                            disabled={!selectedSize}
                        >
                            {selectedSize ? `Add to Cart - ${selectedSize}` : 'Select a size'}
                        </button>
                        <div className="mt-4">
                            <p className="text-gray-400 text-sm">Category: {product.category}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="">
                <h3 className="text-2xl font-bold mb-6">You might also like</h3>
                <div className="flex flex-wrap -mx-3">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
