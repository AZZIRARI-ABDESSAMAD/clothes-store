import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-6">Your cart is empty</h2>
                <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-full text-lg transition no-underline">
                    Start Shopping
                </Link>
            </div>
        );
    }

    const handleCheckout = () => {
        const message = `Order Details:\n${cartItems.map(item => `- ${item.name} (${item.size}) x${item.quantity}`).join('\n')}\n\nTotal: ${total} Dh`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212704752318?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <motion.div
                            layout
                            key={`${item.id}-${item.size}`}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row items-center">
                                <div className="w-full sm:w-28 h-60 flex-shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                                </div>
                                <div className="flex-grow p-4 w-full">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                                        <h5 className="font-bold text-lg">
                                            {item.name}
                                            <span className="ml-2 inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                                                {item.size}
                                            </span>
                                        </h5>
                                        <button
                                            onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium transition cursor-pointer"
                                        >
                                            ✕ Remove
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-green-500 font-bold text-lg">{item.price} Dh</p>
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, amount: -1 }))}
                                            >
                                                −
                                            </button>
                                            <span className="px-4 py-1.5 text-center font-medium bg-white min-w-[40px]">{item.quantity}</span>
                                            <button
                                                className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                                                onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, amount: 1 }))}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-gray-50 rounded-xl shadow-sm p-6 sticky top-20">
                        <h4 className="text-xl font-bold mb-6">Order Summary</h4>
                        <div className="flex justify-between mb-3 text-gray-600">
                            <span>Subtotal</span>
                            <span>{total} Dh</span>
                        </div>
                        <div className="flex justify-between mb-3 text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-500 font-medium">Free</span>
                        </div>
                        <hr className="my-4 border-gray-200" />
                        <div className="flex justify-between mb-6">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-lg font-bold text-green-500">{total} Dh</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition cursor-pointer"
                        >
                            Checkout via WhatsApp
                        </button>
                        <Link to="/" className="block text-center mt-3 text-blue-500 hover:text-blue-600 text-sm no-underline">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
